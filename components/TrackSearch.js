import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { DebounceInput } from 'react-debounce-input';

import { decode } from '../services/Common';
import { trackSearch } from '../services/DataFetch';
import * as KeyCodes from '../services/KeyCodes';

import Loading from './Loading';

const TrackSearch = ({ placeholder }) => {
    const [ trackSearchStr, setTrackSearchStr ] = useState('');
    const [ autocompleteOptions, setAutocompleteOptions ] = useState([]);
    const [ focusedItem, setFocusedItem ] = useState(-1);
    const [ selectedItem, setSelectedItem ] = useState({});
    const [ trackId, setTrackId ] = useState(0);
    const [ loading, setLoading ] = useState(false);

    const handleKeyDown = (event) => {
        const { keyCode } = event;

        if(keyCode === KeyCodes.DOWN_ARROW) {
            focusItem(1);
        }

        if(keyCode === KeyCodes.UP_ARROW) {
            focusItem(-1);
        }

        if(keyCode === KeyCodes.ENTER) {
            selectFocusedItem();
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return() => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [autocompleteOptions, focusedItem]); //this should be an empty array to only be called once, but React is being stubborn, probably need useRef instead

    const clearAutocomplete = () => {
        setAutocompleteOptions([]);
        setFocusedItem(-1);
    }

    const focusItem = (direction) => {
        let currentItem = focusedItem;
        let newValue = 0;
        if(currentItem + direction < 0) {
            newValue = autocompleteOptions.length - 1;
        } else if(currentItem + direction > autocompleteOptions.length - 1) {
            newValue = 0;
        } else {
            newValue = currentItem + direction;
        }
        setFocusedItem(newValue);
    }

    const selectFocusedItem = () => {
        if(focusedItem !== -1) {
            setSelectedItem(autocompleteOptions[focusedItem]);
            setTrackSearchStr(decode(selectedItem.name));
            setTrackId(selectedItem.id);
            clearAutocomplete();
            showTrackFromState();
        }
    }

    const startSearch = (e) => {
        setLoading(true);
        setTrackSearchStr(e.target.value);
    }

    useEffect(() => {
        async function getOptions() {
            try {
                const options = await trackSearch(trackSearchStr);
                setAutocompleteOptions([...options]);
                setLoading(false);
            } catch (err) {
                console.log('Error occured when fetching data');
            }
        }
        getOptions();
    }, [trackSearchStr]);

    const showTrackFromState = (id) => {
        let tid = id ? id : trackId;
        setLoading(true);
        Router.push(`track/${tid}`);
    }

    const mouseSelectTrack = (e, item) => {
        showTrackFromState(item.id);
    }

    return (
        <React.Fragment>
            <div className="autocomplete-container">
                <React.Fragment>
                    { loading ? <Loading /> : '' }
                    <DebounceInput
                        type="text" className="autocomplete-input"
                        minLength={2} value={trackSearchStr} debounceTimeout={500}
                        onBlur={e => clearAutocomplete()}
                        onChange={e => startSearch(e)}
                        placeholder={placeholder}>
                    </DebounceInput>
                    { autocompleteOptions.length > 0 ? 
                        <div className="autocomplete-list-container">
                            { autocompleteOptions.map((item, idx) => (
                                <div key={idx} className={`autocomplete-item ${idx === focusedItem ? 'focused' : ''}`} 
                                     onMouseDown={e => mouseSelectTrack(e, item)}>{decode(item.name)}</div>
                            ))}
                        </div>
                    : '' }
                </React.Fragment>
            </div>
        </React.Fragment>
    );
}

export default TrackSearch;