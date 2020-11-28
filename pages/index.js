import Link from 'next/link';
import Layout from '../components/Layout';
import { seasonSync, seasonList } from '../services/DataFetch';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            seasonList: [],
            displaySyncWindow: false,
            fields: {
                username: '',
                password: '',
                custid: '',
                car: '',
                year: '',
                season: '',
                irsso_v2: ''
            },
            syncWindowMessage: '',
            syncWindowStatus: ''
        };
    }

    showSyncWindow(show) {
        this.setState({ displaySyncWindow: show });
    }

    updateField(e, field) {
        let temp = this.state.fields;
        temp[field] = e.target.value;
        this.setState({ fields: temp });
    }

    async componentDidMount() {
        let list = await seasonList(182407, 165);
        this.setState({ seasonList: list });
    }

    async performSync() {
        this.setState({ syncWindowMessage: 'Synchronizing Data...', syncWindowStatus: 'warn' });
        let { username, password, custid, car, year, season, irsso_v2 } = this.state.fields;
        let res = await seasonSync(username, password, custid, car, year, season, irsso_v2);
        //not sure if all this stuff should be here
        if(res.status === 200) {
            this.setState({ syncWindowMessage: res.message, syncWindowStatus: 'info' });
        } else if(res.status === 401) {
            this.setState({ syncWindowMessage: res.message, syncWindowStatus: 'error' });
        }
    }

    render() {
        const { displaySyncWindow, syncWindowMessage, syncWindowStatus, seasonList } = this.state;
        return (
            <Layout title="IR Stats">
                <div className="main-menu">
                    <Link href="/season/career">
                        <button className="main-link">
                            <span>Career Stats</span>
                        </button>
                    </Link>
                    <Link href="/all-challenge">
                        <button className="main-link">
                            <span>All Positions Challenge</span>
                        </button>
                    </Link>
                    <Link href="/compare">
                        <button className="main-link">
                            <span>Driver Comparison</span>
                        </button>
                    </Link>
                    <button className="main-link" onClick={() => this.showSyncWindow(true)}>
                        <span>Sync Data</span>
                    </button>
                </div>
                <div className="main-menu">
                    {seasonList.map(season =>
                        <Link href={`/season/${season.year}/${season.season}`}>
                            <button className="main-link">
                                <span>{season.year} Season {season.season}</span>
                            </button>
                        </Link>
                    )}
                </div>
                {displaySyncWindow ?
                    <div className="sync-window">
                        <button className="carousel-close-button sync-close" onClick={() => this.showSyncWindow(false)}></button>
                        <div className="sync-overlay"></div>
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
                    </div>
                : '' }
            </Layout>
        );
    }
}

export default Index;