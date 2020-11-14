import Layout from '../components/Layout';
import DriverSearch from '../components/DriverSearch';

class Compare extends React.Component {
    render() {
        const { } = this.props;
        return (
            <Layout title="Driver Comparison" backButton={true}>
                <DriverSearch></DriverSearch>
            </Layout>
        );
    }
}

/*
export async function getServerSideProps({ req, res }) {
    const raceData = await raceDataFetchAll();
    const trackData = await trackDataFetch();
    const allPositionsData = allPositionsChallenge(raceData, 26);

    return { props: { trackData, allPositionsData }};
}
*/

export default Compare;