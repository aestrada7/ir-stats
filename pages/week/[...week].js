import { raceDataFetch, trackDataFetch } from "../../services/DataFetch";
import { weekDataBuild } from "../../services/WeekDataStats";

import Layout from '../../components/Layout';
import Table from '../../components/Table';
import WeekTable from '../../components/WeekTable';
import ImageCarousel from '../../components/ImageCarousel';
import IRatingChart from '../../components/IRatingChart';
import Notes from '../../components/Notes';

class Week extends React.Component {
    static async getInitialProps({ query }) {
        const week = query.week[2];
        const season = query.week[1];
        const year = query.week[0];
        const pageTitle = `${year} S${season} Week ${parseInt(week) + 1} Detail`;
        const raceData = await raceDataFetch(year, season, week);
        const trackData = await trackDataFetch();
        const weekData = weekDataBuild(raceData);
        const car = raceData[0].carid;
        return { pageTitle, raceData, trackData, weekData, season, year, week, car };
    }

    render() {
        const { pageTitle, raceData, trackData, weekData, season, year, week, car } = this.props;
        return (
            <Layout title={pageTitle} backButton={true}>
                <WeekTable weekData={weekData}></WeekTable>
                <Table raceData={raceData} trackData={trackData}></Table>
                <Notes season={season} year={year} week={week} car={car}></Notes>
                <ImageCarousel season={season} year={year} week={week}></ImageCarousel>
                <IRatingChart raceData={raceData}></IRatingChart>
            </Layout>
        );
    }
}

export default Week;