import React, { useState, useContext, useEffect } from 'react';

import TrackName from './TrackName';
import TableItem from './TableItem';
import TableFilter from './TableFilter';
import Driver from './Driver';
import WeekLink from './WeekLink';
import RaceResultLink from './RaceResultLink';

import { TableFilterContext } from '../services/TableFilterContext';

const Table = ({ trackData, showSeason, raceData }) => {
    const [ raceDataSt, setRaceData ] = useState(raceData);
    const [ sortingBy, setSortingBy ] = useState();
    const [ order, setOrder ] = useState('');
    const context = useContext(TableFilterContext);

    const sortBy = (field, order) => {
        let sortedData = raceDataSt.sort((x, y) => order == "ASC" ? y[field] - x[field] : x[field] - y[field]);

        setRaceData(sortedData);
        setSortingBy(field);
        setOrder(order);
    }

    useEffect(() => {
        applyFilters();
    }, [context.filter]);

    const applyFilters = () => {
        let filters = context.filter;
        let filteredData = raceData;

        for(let field in filters) {
            if(filters[field].kind === "number") {
                filteredData = filteredData.filter(item => (parseInt(filters[field].lowerBound) > 0 ? item[field] >= filters[field].lowerBound : true) &&
                                                           (parseInt(filters[field].upperBound) > 0 ? item[field] <= filters[field].upperBound : true));
            }
        }
        let sortedData = filteredData.sort((x, y) => order == "ASC" ? y[sortingBy] - x[sortingBy] : x[sortingBy] - y[sortingBy]);

        setRaceData(sortedData);
    }

    return (
        <React.Fragment>
            <TableFilter></TableFilter>
            <div className="table">
                <div className="table-row flex head">
                    <TableItem columns="4" val="Track / Date"></TableItem>
                    <TableItem columns="2" val="Winner"></TableItem>
                    <TableItem columns="1" val="Points" fieldToSortBy="champpoints" sortFunction={sortBy} sortingBy={sortingBy} order={order}></TableItem>
                    <TableItem columns="1" val="Laps"></TableItem>
                    <TableItem columns="1" val="Total"></TableItem>
                    <TableItem columns="1" val="Led" fieldToSortBy="led" sortFunction={sortBy} sortingBy={sortingBy} order={order}></TableItem>
                    <TableItem columns="1" val="Start" fieldToSortBy="starting_position" sortFunction={sortBy} sortingBy={sortingBy} order={order}></TableItem>
                    <TableItem columns="1" val="Finish" fieldToSortBy="finishing_position" sortFunction={sortBy} sortingBy={sortingBy} order={order}></TableItem>
                </div>
                { raceDataSt.map(raceItem => (
                    <React.Fragment key={raceItem.subsessionid}>
                        <div className="table-row flex">
                            <TableItem columns="4" className="composite-field">
                                <TrackName id={raceItem.trackid} week={raceItem.race_week_num} trackData={trackData}
                                        value="shortName" season={raceItem.season_quarter} year={raceItem.season_year} linkTo="track"></TrackName>
                                <br />
                                <WeekLink date={raceItem.sessionstarttime} week={raceItem.race_week_num} epochTime={true}
                                        season={raceItem.season_quarter} year={raceItem.season_year} showSeason={showSeason}></WeekLink>
                            </TableItem>
                            <TableItem columns="2">
                                <Driver name={raceItem.winnerdisplayname} showHelmet={true} hasLink={true} id={raceItem.winnerid}
                                        helmetColors={[raceItem.winnerhelmcolor1, raceItem.winnerhelmcolor2]}></Driver>
                            </TableItem>
                            <TableItem columns="1">
                                <RaceResultLink subsessionid={raceItem.subsessionid} val={raceItem.champpoints}></RaceResultLink>
                            </TableItem>
                            <TableItem columns="1" val={raceItem.laps}></TableItem>
                            <TableItem columns="1" val={raceItem.totalLaps}></TableItem>
                            <TableItem columns="1" val={raceItem.led} defaultVal="0"></TableItem>
                            <TableItem columns="1" val={raceItem.starting_position} isResult={true}></TableItem>
                            <TableItem columns="1" val={raceItem.finishing_position} isResult={true}></TableItem>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </React.Fragment>
    )
}

export default Table;