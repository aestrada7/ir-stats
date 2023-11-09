import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import SyncWindow from '../components/SyncWindow';
import TrackSearch from '../components/TrackSearch';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            seasonList: [],
            displaySyncWindow: false,
            displaySyncHostedWindow: false
        };
    }

    async showSyncWindow(show) {
        this.setState({ displaySyncWindow: show });
        await this.updateList();
    }

    async showSyncHostedWindow(show) {
        this.setState({ displaySyncHostedWindow: show });
        await this.updateList();
    }

    render() {
        const { displaySyncWindow, displaySyncHostedWindow } = this.state;
        return (
            <Layout title="Home">
                all of this will be removed or change, look at VRS's site
                <div className="track-search">
                    <TrackSearch placeholder="Enter track name or id"></TrackSearch>
                </div>
                <div className="main-menu top">
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
                    <button className="main-link" onClick={() => this.showSyncHostedWindow(true)}>
                        <span>Sync Hosted Data</span>
                    </button>
                </div>
                {displaySyncWindow ?
                    <SyncWindow parent={this}></SyncWindow>
                : '' }
                {displaySyncHostedWindow ?
                    <SyncWindow parent={this} hosted={true}></SyncWindow>
                : '' }
            </Layout>
        );
    }
}

export default Main;