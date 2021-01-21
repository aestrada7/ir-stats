import { decode } from "../services/Common";
import { driverSearch } from "../services/DataFetch";
import { DebounceInput } from 'react-debounce-input';
import * as KeyCodes from "../services/KeyCodes";

class DriverSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            driverSearch: props.driverSearch,
            autocompleteOptions: [],
            focusedItem: -1,
            selectedItem: {}
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
        if(this.props.id) {
            this.setState({ autocompleteOptions: await driverSearch(this.props.id) });
            this.setState({ selectedItem: this.state.autocompleteOptions[0] });
            this.clearAutocomplete();
            this.props.parent.selectDriver(this.state.selectedItem);
        }
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
            this.setState({ driverSearch: decode(this.state.selectedItem.displayname) });
            this.clearAutocomplete();
            this.props.parent.selectDriver(this.state.selectedItem);
        }
    }

    async updateText(e) {
        this.setState({ driverSearch: e.target.value });
        this.setState({ autocompleteOptions: await driverSearch(e.target.value) });
    }

    render() {
        const { driverSearch, autocompleteOptions, focusedItem, selectedItem } = this.state;

        return (
            <div className="autocomplete-container">
                <React.Fragment>
                    <DebounceInput
                        type="text" className="autocomplete-input"
                        minLength={2} value={driverSearch} debounceTimeout={500}
                        onBlur={e => this.clearAutocomplete()}
                        onChange={e => this.updateText(e)}>
                    </DebounceInput>
                    { autocompleteOptions.length > 0 ? 
                        <div className="autocomplete-list-container">
                            { autocompleteOptions.map((item, idx) => (
                                <div className={`autocomplete-item ${idx === focusedItem ? 'focused' : ''}`}>{decode(item.displayname)}</div>
                            ))}
                        </div>
                    : '' }
                </React.Fragment>
            </div>
        );
    }
}

export default DriverSearch;