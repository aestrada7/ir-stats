import { decode } from "../services/Common";
import { driverSearch } from "../services/DataFetch";
import { DebounceInput } from 'react-debounce-input';

class DriverSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            driverSearch: props.driverSearch,
            autocompleteOptions: []
        }
    }

    async updateText(e) {
        this.setState({ driverSearch: e.target.value });
        this.setState({ autocompleteOptions: await driverSearch(e.target.value) });
    }

    render() {
        const { driverSearch, autocompleteOptions } = this.state;

        return (
            <div className="">
                <React.Fragment>
                    <DebounceInput
                        type="text" className="note-edit"
                        minLength={2} value={driverSearch} debounceTimeout={500}
                        onChange={e => this.updateText(e)}>
                    </DebounceInput>
                    { autocompleteOptions.map(item => (
                        <div>{decode(item.displayname)}</div>
                    ))}
                </React.Fragment>
            </div>
        );
    }
}

export default DriverSearch;