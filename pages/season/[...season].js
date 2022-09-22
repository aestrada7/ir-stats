import React, { useState } from 'react';

import { raceDataFetch, trackDataFetch, raceDataFetchAll } from '../../services/DataFetch';
import { weekDataBuild } from '../../services/WeekDataStats';

import Layout from '../../components/Layout';
import Table from '../../components/Table';
import WeekTable from '../../components/WeekTable';
import IRatingChart from '../../components/IRatingChart';
import SeasonPoints from '../../components/SeasonPoints';

import { TableFilterContext } from '../../services/TableFilterContext';

const Season = ({ raceData, trackData, weekData, year, pageTitle }) => {
    const [ filter, setFilter ] = useState({});
    const value = { filter, setFilter };

    return (
        <Layout title={pageTitle} backButton={true}>
            <TableFilterContext.Provider value={value}>
                <WeekTable weekData={weekData}></WeekTable>
                {year != "career" && <SeasonPoints raceData={raceData} trackData={trackData}></SeasonPoints>}
                <Table raceData={raceData} trackData={trackData} showSeason={year == "career"}></Table>
                <IRatingChart raceData={raceData}></IRatingChart>
            </TableFilterContext.Provider>
        </Layout>
    );
}

Season.getInitialProps = async ({ query }) => {
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

export default Season;