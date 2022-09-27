import React, { useState } from 'react';

import { raceDataFetch, trackDataFetch, messageGet } from '../../services/DataFetch';
import { weekDataBuild } from '../../services/WeekDataStats';

import Layout from '../../components/Layout';
import Table from '../../components/Table';
import WeekTable from '../../components/WeekTable';
import ImageCarousel from '../../components/ImageCarousel';
import IRatingChart from '../../components/IRatingChart';
import Notes from '../../components/Notes';

import { TableFilterContext } from '../../services/TableFilterContext';

const Week = ({ pageTitle, raceData, trackData, weekData, season, year, week, car, notes }) => {
    const [ filter, setFilter ] = useState({});
    const value = { filter, setFilter };

    return(
        <Layout title={pageTitle} backButton={true}>
            <TableFilterContext.Provider value={value}>
                <WeekTable weekData={weekData}></WeekTable>
                <Table raceData={raceData} trackData={trackData}></Table>
                <Notes season={season} year={year} week={week} car={car} notes={notes}></Notes>
                <ImageCarousel season={season} year={year} week={week}></ImageCarousel>
                <IRatingChart raceData={raceData}></IRatingChart>
            </TableFilterContext.Provider>
        </Layout>
    )
}

Week.getInitialProps = async({ query }) => {
    const week = query.week[2];
    const season = query.week[1];
    const year = query.week[0];
    const pageTitle = `${year} S${season} Week ${parseInt(week) + 1} Detail`;
    const raceData = await raceDataFetch(year, season, week);
    const trackData = await trackDataFetch();
    const weekData = weekDataBuild(raceData);
    const car = raceData[0].carid;
    const notes = await messageGet(year, season, week, car);

    return { pageTitle, raceData, trackData, weekData, season, year, week, car, notes };
}

export default Week;