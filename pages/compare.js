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
        let comparisonDriverData = await raceResultsFetch(selectedDriver.custid, 99);
        let comparisonDriverSubsessions = [];
        comparisonDriverData.map(result => comparisonDriverSubsessions.push(result.subsessionid));
        let myCurrentDriverData = await raceResultsFetch(182407, 99, -1, -1, -1, comparisonDriverSubsessions);

        let compareData = {
            selectedDriverData: comparisonDriverData.sort((a, b) => (a.subsessionid > b.subsessionid) ? 1 : -1),
            myDriverData: myCurrentDriverData.sort((a, b) => (a.subsessionid > b.subsessionid) ? 1 : -1)
        };
        this.setState({ compareData });
    }

    render() {
        const { trackData } = this.props;
        const { selectedDriver, compareData } = this.state;
        return (
            <Layout title="Driver Comparison" backButton={true}>
                <div>Who: {selectedDriver.displayname}</div>
                <DriverSearch parent={this}></DriverSearch>
                <DriverCompareTable compareData={compareData} trackData={trackData}></DriverCompareTable>
            </Layout>
        );
    }
}

export async function getServerSideProps({ req, res }) {
    const trackData = await trackDataFetch();

    return { props: { trackData }};
}

export default Compare;