import { replaceLineBreaks } from "../services/Common";
import { messageSet, messageGetLocal, messageSetLocal } from "../services/DataFetch";
import * as Config from "../services/Config";

class Notes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            previousNotes: '',
            notes: props.notes,
            editMode: false
        }
    }

    componentDidMount() {
        if(Config.DATA_PROVIDER === Config.DATABASE_LOCAL_STORAGE) {
            const { year, season, week, car } = this.props;
            this.setState({ notes: messageGetLocal(year, season, week, car) });
        }
    }

    saveText(year, season, week, car, value) {
        if(Config.DATA_PROVIDER === Config.DATABASE_NEDB) {
            messageSet(year, season, week, car, value);
        } else if(Config.DATA_PROVIDER === Config.DATABASE_LOCAL_STORAGE) {
            messageSetLocal(year, season, week, car, value);
        }
        this.setState({ editMode: false });
    }

    updateText(e) {
        this.setState({ notes: e.target.value });
    }

    editMode(editing) {
        this.setState({ editMode: editing });

        if(editing) {
            this.setState({ previousNotes: this.state.notes });
        }
        if(!editing) {
            this.setState({ notes: this.state.previousNotes });
        }
    }

    render() {
        const { year, season, week, car } = this.props;
        const { notes, editMode } = this.state;

        return (
            <div className="notes-container">
                {!editMode ?
                    <React.Fragment>
                        <div className="notes" dangerouslySetInnerHTML={replaceLineBreaks(notes)} onDoubleClick={() => this.editMode(true)}></div>
                        <button onClick={() => this.editMode(true)}>Add/Edit Notes</button>
                    </React.Fragment>
                :
                    <React.Fragment>
                        <textarea className="note-edit" value={notes} onChange={e => this.updateText(e)}></textarea>
                        <button onClick={() => this.saveText(year, season, week, car, notes)}>Save</button>
                        <button onClick={() => this.editMode(false)}>Cancel</button>
                    </React.Fragment>
                }
            </div>
        );
    }
}

export default Notes;