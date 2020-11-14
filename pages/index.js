import Link from 'next/link';

import { iracingAuthentication } from '../services/Authentication';
import Layout from '../components/Layout';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displaySyncWindow: false,
            isLoggedIn: false,
            username: '',
            password: ''
        };
    }

    showSyncWindow() {
        this.setState({ displaySyncWindow: true });
    }

    updateUser(e) {
        this.setState({ username: e.target.value });
    }

    updatePassword(e) {
        this.setState({ password: e.target.value });
    }

    attemptLogin() {
        iracingAuthentication(this.state.username, this.state.password);
    }

    render() {
        const { displaySyncWindow, isLoggedIn, username, password } = this.state;
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
                        {!isLoggedIn ? 
                            <div className="login-form">
                                <input type="text" onChange={e => this.updateUser(e)}></input>
                                <input type="password" onChange={e => this.updatePassword(e)}></input>
                                <button className="login" onClick={() => this.attemptLogin()}>Login</button>
                            </div>
                        : '' }
                    </div>
                : '' }
            </Layout>
        );
    }
}

export default Index;