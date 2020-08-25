import { raceDataFetchAll, trackDataFetch } from "../services/DataFetch";
import { allPositionsChallenge } from "../services/AllPositionsStats";
import { basicAuthentication } from "../services/Authentication";

import Layout from '../components/Layout';
import AllPositionsItem from '../components/AllPositionsItem';

class AllChallenge extends React.Component {
    render() {
        const { trackData, allPositionsData } = this.props;
        return (
            <Layout title="All Positions Challenge" backButton={true}>
                <div className="test">{ allPositionsData.map(positionItem => (
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