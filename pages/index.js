import Link from 'next/link';
import Layout from '../components/Layout';
import { seasonSync } from '../services/DataFetch';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displaySyncWindow: false,
            fields: {
                username: '',
                password: '',
                custid: '',
                car: '',
                year: '',
                season: '',
                irsso_v2: ''
            }
        };
    }

    showSyncWindow() {
        this.setState({ displaySyncWindow: true });
    }

    updateField(e, field) {
        let temp = this.state.fields;
        temp[field] = e.target.value;
        this.setState({ fields: temp });
    }

    async performSync() {
        let { username, password, custid, car, year, season, irsso_v2 } = this.state.fields;
        let res = await seasonSync(username, password, custid, car, year, season, irsso_v2);
        console.log(res);
    }

    render() {
        const { displaySyncWindow, isLoggedIn } = this.state;
        return (
            <Layout title="IR Stats">
                <div className="main-menu">
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
                    <button className="main-link" onClick={() => this.showSyncWindow()}>
                        <span>Sync Data</span>
                    </button>
                </div>
                <div className="main-menu">
                    <Link href="/season/career">
                        <button className="main-link">
                            <span>Career Stats</span>
                        </button>
                    </Link>
                    <Link href="/season/2020/4">
                        <button className="main-link">
                            <span>2020 Season 4</span>
                        </button>
                    </Link>
                    <Link href="/season/2020/3">
                        <button className="main-link">
                            <span>2020 Season 3</span>
                        </button>
                    </Link>
                    <Link href="/season/2020/2">
                        <button className="main-link">
                            <span>2020 Season 2</span>
                        </button>
                    </Link>
                    <Link href="/season/2019/3">
                        <button className="main-link">
                            <span>2019 Season 3</span>
                        </button>
                    </Link>
                    <Link href="/season/2018/4">
                        <button className="main-link">
                            <span>2018 Season 4</span>
                        </button>
                    </Link>
                    <Link href="/season/2015/3">
                        <button className="main-link">
                            <span>2015 Season 3</span>
                        </button>
                    </Link>
                </div>
                {displaySyncWindow ?
                    <div className="sync-window">
                        <div className="sync-overlay"></div>
                        {!isLoggedIn ? 
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
                                <button className="sync" onClick={() => this.performSync()}>Sync Data</button>
                            </div>
                        : '' }
                    </div>
                : '' }
            </Layout>
        );
    }
}

export default Index;