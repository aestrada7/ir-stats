import React from 'react';
import Layout from '../components/Layout';
import DriverCompareTable from '../components/DriverCompareTable';
import DriverSearch from '../components/DriverSearch';
import { raceResultsFetch, trackDataFetch } from '../services/DataFetch';

class Compare extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDriver: {},
            compareData: {}
        }
    }

    async selectDriver(selectedDriver) {
        this.setState({ selectedDriver });
        let comparisonDriverData = await raceResultsFetch(selectedDriver.custid, [99, 57]);
        let comparisonDriverSubsessions = [];
        comparisonDriverData.map(result => comparisonDriverSubsessions.push(result.subsessionid));
        let myCurrentDriverData = await raceResultsFetch(182407, [99, 57], null, null, null, comparisonDriverSubsessions);

        let compareData = {
            selectedDriverData: comparisonDriverData.sort((a, b) => (a.subsessionid > b.subsessionid) ? 1 : -1),
            myDriverData: myCurrentDriverData.sort((a, b) => (a.subsessionid > b.subsessionid) ? 1 : -1)
        };
        this.setState({ compareData });
    }

    render() {
        const { trackData, id } = this.props;
        const { selectedDriver, compareData } = this.state;
        return (
            <Layout title="Driver Comparison" backButton={true}>
                <div>Who: {selectedDriver.displayname}</div>
                <DriverSearch parent={this} id={id}></DriverSearch>
                <DriverCompareTable compareData={compareData} trackData={trackData} showSeason={true}></DriverCompareTable>
            </Layout>
        );
    }
}

export async function getServerSideProps({ query }) {
    const trackData = await trackDataFetch();
    const id = query.id || 0;

    return { props: { trackData, id }};
}

export default Compare;