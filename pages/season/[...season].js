import { raceDataFetch, trackDataFetch, raceDataFetchAll } from "../../services/DataFetch";
import { weekDataBuild } from "../../services/WeekDataStats";

import Layout from "../../components/Layout";
import Table from "../../components/Table";
import WeekTable from '../../components/WeekTable';
import IRatingChart from '../../components/IRatingChart';

class Season extends React.Component {
    static async getInitialProps({ query }) {
        const season = query.season[1];
        const year = query.season[0];
        const raceData = year != "career" ? await raceDataFetch(year, season) : await raceDataFetchAll();
        const trackData = await trackDataFetch();
        const weekData = weekDataBuild(raceData);

        return { raceData, trackData, weekData, season, year };
    }

    render() {
        const { raceData, trackData, weekData, season, year } = this.props;
        return (
            <Layout title={`IR Stats ${year} Season ${season}`} backButton={true}>
                <WeekTable weekData={weekData}></WeekTable>
                <Table raceData={raceData} trackData={trackData}></Table>
                <IRatingChart raceData={raceData}></IRatingChart>
            </Layout>
        );
    }
}

export default Season;