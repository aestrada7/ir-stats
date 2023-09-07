import React, { useState, useEffect, useContext } from 'react';

import { raceDataFetchAll, trackDataFetch } from "../services/DataFetch";
import { allPositionsChallenge } from "../services/AllPositionsStats";

import Layout from '../components/Layout';
import AllPositionsItem from '../components/AllPositionsItem';
import AllPositionsChart from '../components/AllPositionsChart';
import DateSlider from '../components/DateSlider';

import { AllPositionsContext } from '../services/AllPositionsContext';

const AllChallenge = ({ trackData, allPositionsData }) => {
    const [ allPositionsDataSt, setAllPositionsDataSt ] = useState(allPositionsData);
    const [ collapseAll, setCollapseAll ] = useState(false);
    const [ month, setMonth ] = useState(0);
    const [ year, setYear ] = useState(0);
    const value = { month, setMonth, year, setYear };

    const toggleCollapse = () => {
        setCollapseAll(!collapseAll);
    }

    useEffect(() => {
        applyFilters();
    }, [month, year]);

    const applyFilters = () => {
        let filteredData = JSON.parse(JSON.stringify(allPositionsData));
        let computedMonth = month + 1;
        let computedYear = year;

        if(computedMonth === 13) {
            computedMonth = 1;
            computedYear += 1;
        }

        let mockDate = new Date(`${computedMonth}/1/${computedYear}`);
        let epochTime = mockDate.getTime();
        filteredData.map(item => item.track_season = item.track_season.filter(race => race.time <= epochTime));
        setAllPositionsDataSt(filteredData);
    }

    return(
        <Layout title="All Positions Challenge" backButton={true}>
            <AllPositionsContext.Provider value={value}>
                <DateSlider></DateSlider>
                <AllPositionsChart positionsData={allPositionsDataSt}></AllPositionsChart>
                <button onClick={() => toggleCollapse()}>{collapseAll ? `Collapse All` : `Expand All`}</button>
                <div className="all-positions-table">
                {
                    allPositionsDataSt.map(positionItem => (
                        <AllPositionsItem positionItem={positionItem} trackData={trackData}
                                          collapseAll={collapseAll}></AllPositionsItem>
                    ))
                }
                </div>
            </AllPositionsContext.Provider>
        </Layout>
    )
}

AllChallenge.getInitialProps = async() => {
    const raceData = await raceDataFetchAll();
    const trackData = await trackDataFetch();
    const allPositionsData = allPositionsChallenge(raceData, 26);

    return { trackData, allPositionsData };
}

export default AllChallenge;