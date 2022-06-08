import React from 'react';

import TrackName from './TrackName';
import TableItem from './TableItem';
import TableFilter from './TableFilter';
import Driver from './Driver';
import WeekLink from './WeekLink';
import RaceResultLink from './RaceResultLink';
import { TableFilterContext } from '../services/TableFilterContext';

class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            raceData: this.props.raceData,
            sortingBy: null,
            order: '',
            filters: {},
            setFilter: this.setFilter
        };
    }

    sortBy = (field, order) => {
        let sortedData = this.state.raceData.sort((x, y) => order == "ASC" ? y[field] - x[field] : x[field] - y[field]);

        this.setState({
            raceData: sortedData,
            sortingBy: field,
            order
        });
    }

    setFilter = (field, kind, lowerBound, upperBound) => {
        let currentFilters = this.state.filters;
        if(currentFilters[field] == null) {
            currentFilters[field] = {};
        }
        if(lowerBound > -1) currentFilters[field].lowerBound = lowerBound;
        if(upperBound > -1) currentFilters[field].upperBound = upperBound;
        if(kind) currentFilters[field].kind = kind;

        this.setState({
            filters: currentFilters
        });

        this.applyFilters();
    }

    applyFilters = () => {
        let filters = this.state.filters;
        let filteredData = this.props.raceData;

        for(let field in filters) {
            if(filters[field].kind === "number") {
                filteredData = filteredData.filter(item => (parseInt(filters[field].lowerBound) > 0 ? item[field] >= filters[field].lowerBound : true) &&
                                                           (parseInt(filters[field].upperBound) > 0 ? item[field] <= filters[field].upperBound : true));
            }
        }
        let sortField = this.state.sortingBy;
        let sortedData = filteredData.sort((x, y) => this.state.order == "ASC" ? y[sortField] - x[sortField] : x[sortField] - y[sortField]);

        this.setState({
            raceData: sortedData
        });
    }

    render() {
        const { trackData, showSeason } = this.props;
        const { raceData, sortingBy, order } = this.state;
        return (
            <React.Fragment>
                <TableFilterContext.Provider value={this.state}>
                    <TableFilter></TableFilter>
                </TableFilterContext.Provider>
                <div className="table">
                    <div className="table-row flex head">
                        <TableItem columns="4" val="Track / Date"></TableItem>
                        <TableItem columns="2" val="Winner"></TableItem>
                        <TableItem columns="1" val="Points" fieldToSortBy="champpoints" parent={this} sortingBy={sortingBy} order={order}></TableItem>
                        <TableItem columns="1" val="Laps"></TableItem>
                        <TableItem columns="1" val="Total"></TableItem>
                        <TableItem columns="1" val="Led" fieldToSortBy="led" parent={this} sortingBy={sortingBy} order={order}></TableItem>
                        <TableItem columns="1" val="Start" fieldToSortBy="starting_position" parent={this} sortingBy={sortingBy} order={order}></TableItem>
                        <TableItem columns="1" val="Finish" fieldToSortBy="finishing_position" parent={this} sortingBy={sortingBy} order={order}></TableItem>
                    </div>
                    { raceData.map(raceItem => (
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
}

export default Table;