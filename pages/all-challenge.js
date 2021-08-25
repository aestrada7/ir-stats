import React from 'react';

import { raceDataFetchAll, trackDataFetch } from "../services/DataFetch";
import { allPositionsChallenge } from "../services/AllPositionsStats";
import { basicAuthentication } from "../services/Authentication";

import Layout from '../components/Layout';
import AllPositionsItem from '../components/AllPositionsItem';

class AllChallenge extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: false
        }
    }

    render() {
        const { trackData, allPositionsData } = this.props;
        const { collapsed } = this.state;
        return (
            <Layout title="All Positions Challenge" backButton={true}>
                <div className="all-positions-table">{ allPositionsData.map(positionItem => (
                    <AllPositionsItem positionItem={positionItem} trackData={trackData}></AllPositionsItem>
                ))}</div>
            </Layout>
        );
    }
}

export async function getServerSideProps({ req, res }) {
    basicAuthentication(req, res);

    const raceData = await raceDataFetchAll();
    const trackData = await trackDataFetch();
    const allPositionsData = allPositionsChallenge(raceData, 26);

    return { props: { trackData, allPositionsData }};
}

export default AllChallenge;