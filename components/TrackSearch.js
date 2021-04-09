import { decode } from "../services/Common";
import { DebounceInput } from 'react-debounce-input';
import { trackSearch } from "../services/DataFetch";
import * as KeyCodes from "../services/KeyCodes";
import Router from 'next/router';

class TrackSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            trackSearch: '',
            autocompleteOptions: [],
            focusedItem: -1,
            selectedItem: {},
            trackId: 0
        }
    }

    handleKeyDown = event => {
        const { keyCode } = event;

        if(keyCode === KeyCodes.DOWN_ARROW) {
            this.focusItem(1);
        }

        if(keyCode === KeyCodes.UP_ARROW) {
            this.focusItem(-1);
        }

        if(keyCode === KeyCodes.ENTER) {
            this.selectFocusedItem();
        }
    }

    async componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    clearAutocomplete() {
        this.setState({ autocompleteOptions: [], focusedItem: -1 });
    }

    focusItem(direction) {
        let currentItem = this.state.focusedItem;
        let newValue = 0;
        if(currentItem + direction < 0) {
            newValue = this.state.autocompleteOptions.length - 1;
        } else if(currentItem + direction > this.state.autocompleteOptions.length - 1) {
            newValue = 0;
        } else {
            newValue = currentItem + direction;
        }
        this.setState({ focusedItem: newValue });
    }

    selectFocusedItem() {
        if(this.state.focusedItem !== -1) {
            this.setState({ selectedItem: this.state.autocompleteOptions[this.state.focusedItem] });
            this.setState({ trackSearch: decode(this.state.selectedItem.name) });
            this.setState({ trackId: this.state.selectedItem.id });
            this.clearAutocomplete();
            Router.push(`track/${this.state.trackId}`);
        }
    }

    async updateText(e) {
        this.setState({ trackSearch: e.target.value });
        this.setState({ autocompleteOptions: await trackSearch(e.target.value) });
    }

    render() {
        const { trackSearch, autocompleteOptions, focusedItem } = this.state;
        const { placeholder } = this.props;

        return (
            <div className="autocomplete-container">
                <React.Fragment>
                    <DebounceInput
                        type="text" className="autocomplete-input"
                        minLength={2} value={trackSearch} debounceTimeout={500}
                        onBlur={e => this.clearAutocomplete()}
                        onChange={e => this.updateText(e)}
                        placeholder={placeholder}>
                    </DebounceInput>
                    { autocompleteOptions.length > 0 ? 
                        <div className="autocomplete-list-container">
                            { autocompleteOptions.map((item, idx) => (
                                <div className={`autocomplete-item ${idx === focusedItem ? 'focused' : ''}`}>{decode(item.name)}</div>
                            ))}
                        </div>
                    : '' }
                </React.Fragment>
            </div>
        );
    }
}

export default TrackSearch;