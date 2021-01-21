import { raceDataFetch, trackDataFetch, raceDataFetchAll } from "../../services/DataFetch";
import { weekDataBuild } from "../../services/WeekDataStats";

import Layout from "../../components/Layout";
import Table from "../../components/Table";
import WeekTable from '../../components/WeekTable';
import IRatingChart from '../../components/IRatingChart';
import SeasonPoints from '../../components/SeasonPoints';

class Season extends React.Component {
    static async getInitialProps({ query }) {
        const season = query.season[1];
        const year = query.season[0];

        let pageTitle = "";
        let raceData;

        if(year != "career") {
            pageTitle = `IR Stats ${year} Season ${season}`;
            raceData = await raceDataFetch(year, season);
        } else {
            pageTitle = `Career Stats`;
            raceData = await raceDataFetchAll();
        }

        const trackData = await trackDataFetch();
        const weekData = weekDataBuild(raceData);

        return { raceData, trackData, weekData, year, pageTitle };
    }

    render() {
        const { raceData, trackData, weekData, year, pageTitle } = this.props;
        return (
            <Layout title={pageTitle} backButton={true}>
                <WeekTable weekData={weekData}></WeekTable>
                {year != "career" && <SeasonPoints raceData={raceData} trackData={trackData}></SeasonPoints>}
                <Table raceData={raceData} trackData={trackData}></Table>
                <IRatingChart raceData={raceData}></IRatingChart>
            </Layout>
        );
    }
}

export default Season;