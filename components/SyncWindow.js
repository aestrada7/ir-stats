import { seasonSync, hostedSync } from '../services/DataFetch';

class SyncWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {
                username: '',
                password: '',
                custid: '',
                car: '',
                year: '',
                season: '',
                irsso_v2: '',
                date_from: '',
                date_to: ''
            },
            syncWindowMessage: '',
            syncWindowStatus: ''
        };
    }

    updateField(e, field) {
        let temp = this.state.fields;
        temp[field] = e.target.value;
        this.setState({ fields: temp });
    }

    async performSync() {
        this.setState({ syncWindowMessage: 'Synchronizing Data...', syncWindowStatus: 'warn' });
        let { username, password, custid, car, year, season, irsso_v2 } = this.state.fields;
        let res = await seasonSync(username, password, custid, car, year, season, irsso_v2);

        if(res.status === 200) {
            this.setState({ syncWindowMessage: res.message, syncWindowStatus: 'info' });
        } else if(res.status === 401) {
            this.setState({ syncWindowMessage: res.message, syncWindowStatus: 'error' });
        }
    }

    async performHostedSync() {
        this.setState({ syncWindowMessage: 'Synchronizing Data...', syncWindowStatus: 'warn' });
        let { username, password, custid, car, date_from, date_to, irsso_v2 } = this.state.fields;
        let res = await hostedSync(username, password, custid, car, date_from, date_to, irsso_v2);

        if(res.status === 200) {
            this.setState({ syncWindowMessage: res.message, syncWindowStatus: 'info' });
        } else if(res.status === 401) {
            this.setState({ syncWindowMessage: res.message, syncWindowStatus: 'error' });
        }
    }

    render() {
        const { parent, hosted } = this.props;
        const { syncWindowStatus, syncWindowMessage } = this.state;

        return (
            <div className="sync-window">
                {!hosted ?
                    <React.Fragment>
                        <div className="sync-overlay"></div>
                        <button className="carousel-close-button sync-close" onClick={() => parent.showSyncWindow(false)}></button>
                        <div className="login-form">
                            <span>Username:</span>
                            <input type="text" onChange={e => this.updateField(e, 'username')}></input>
                            <span>Password:</span>
                            <input type="password" onChange={e => this.updateField(e, 'password')}></input>
                            <span>Customer Id:</span>
                            <input type="text" onChange={e => this.updateField(e, 'custid')}></input>
                            <span>Car Id:</span>
                            <input type="text" onChange={e => this.updateField(e, 'car')}></input>
                            <span>Year:</span>
                            <input type="text" onChange={e => this.updateField(e, 'year')}></input>
                            <span>Season:</span>
                            <input type="text" onChange={e => this.updateField(e, 'season')}></input>
                            <span>irsso_v2 cookie:</span>
                            <input type="text" onChange={e => this.updateField(e, 'irsso_v2')}></input>
                            <button className="sync" onClick={() => this.performSync()} disabled={syncWindowStatus === 'warn'}>Sync Data</button>
                            <div className={`sync-status ${syncWindowStatus}`}>{syncWindowMessage}</div>
                        </div>
                    </React.Fragment>
                :
                    <React.Fragment>
                        <div className="sync-overlay"></div>
                        <button className="carousel-close-button sync-close" onClick={() => parent.showSyncHostedWindow(false)}></button>
                        <div className="login-form">
                            <span>Username:</span>
                            <input type="text" onChange={e => this.updateField(e, 'username')}></input>
                            <span>Password:</span>
                            <input type="password" onChange={e => this.updateField(e, 'password')}></input>
                            <span>Customer Id:</span>
                            <input type="text" onChange={e => this.updateField(e, 'custid')}></input>
                            <span>Car Id:</span>
                            <input type="text" onChange={e => this.updateField(e, 'car')}></input>
                            <span>Date From:</span>
                            <input type="text" onChange={e => this.updateField(e, 'date_from')}></input>
                            <span>Date To:</span>
                            <input type="text" onChange={e => this.updateField(e, 'date_to')}></input>
                            <span>irsso_v2 cookie:</span>
                            <input type="text" onChange={e => this.updateField(e, 'irsso_v2')}></input>
                            <button className="sync" onClick={() => this.performHostedSync()} disabled={syncWindowStatus === 'warn'}>Sync Hosted Data</button>
                            <div className={`sync-status ${syncWindowStatus}`}>{syncWindowMessage}</div>
                        </div>
                    </React.Fragment>
                }
            </div>
        );
    }
}

export default SyncWindow;