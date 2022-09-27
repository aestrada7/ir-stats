import React, { useState } from 'react';
import Link from 'next/link';

import { raceDataFetchAll, trackDataFetch } from '../../services/DataFetch';
import { weekDataBuild } from '../../services/WeekDataStats';
import { itemExists } from '../../services/Common';

import Layout from '../../components/Layout';
import Table from '../../components/Table';
import WeekTable from '../../components/WeekTable';
import IRatingChart from '../../components/IRatingChart';

import { TableFilterContext } from '../../services/TableFilterContext';

const Track = ({ pageTitle, raceData, trackData, weekData, trackId, legacyTrackIds }) => {
    const [ filter, setFilter ] = useState({});
    const value = { filter, setFilter };

    return (
        <Layout title={pageTitle} backButton={true}>
            <TableFilterContext.Provider value={value}>
                { legacyTrackIds ? <Link href={`/track/${trackId}/1`}><button className="hide-legacy">Hide Legacy Data</button></Link> : '' }
                <WeekTable weekData={weekData}></WeekTable>
                <Table raceData={raceData} trackData={trackData} showSeason={true}></Table>
                <IRatingChart raceData={raceData}></IRatingChart>
            </TableFilterContext.Provider>
        </Layout>
    );
}

Track.getInitialProps = async({ query }) => {
    const trackId = query.track[0];
    const hideLegacy = query.track[1] || false;

    const trackData = await trackDataFetch();
    const track = trackData.filter(x => x.id == trackId)[0].name;
    const legacyTrackIds = !hideLegacy ? trackData.filter(x => x.id == trackId)[0].legacyIds || null : null;
    let newTrackIds = [];
    try {
        newTrackIds.push(trackData.filter(x => x.legacyIds == trackId)[0].id || null);
    } catch(e) {
        //do nothing
    }

    const pageTitle = `Results at ${track}`;

    const raceDataAll = await raceDataFetchAll();
    const raceData = raceDataAll.filter(x => x.trackid == trackId || itemExists(x.trackid, legacyTrackIds) || itemExists(x.trackid, newTrackIds));

    const weekData = weekDataBuild(raceData);
    return { pageTitle, raceData, trackData, weekData, trackId, legacyTrackIds };
}

export default Track;