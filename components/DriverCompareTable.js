import TableItem from './TableItem';
import Driver from './Driver';
import WeekLink from './WeekLink';
import RaceResultLink from './RaceResultLink';
import TrackName from './TrackName';
import DriverCompareWins from './DriverCompareWins';

class DriverCompareTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { trackData, compareData } = this.props;
        return (
            <div className="table">
                <div className="table-row flex head">
                    { compareData.selectedDriverData && compareData.selectedDriverData.length > 0 ?
                        <React.Fragment>
                            <TableItem columns="4" val="Track / Date"></TableItem>
                            <TableItem columns="2" val="Subsession"></TableItem>
                            <TableItem columns="3">
                                <Driver name={compareData.selectedDriverData[0].displayname} showHelmet={false}></Driver>
                                <DriverCompareWins compareData={compareData} thisDriver={false}></DriverCompareWins>
                            </TableItem>
                            <TableItem columns="3">
                                <Driver name={compareData.myDriverData[0].displayname} showHelmet={false}></Driver>
                                <DriverCompareWins compareData={compareData} thisDriver={true}></DriverCompareWins>
                            </TableItem>
                        </React.Fragment>
                    : '' }
                </div>
                { compareData.selectedDriverData && compareData.selectedDriverData.map((raceItem, idx) => (
                    <React.Fragment key={raceItem.subsessionid}>
                        <div className="table-row flex">
                            <TableItem columns="4" className="composite-field">
                                <TrackName id={raceItem.trackid} week={raceItem.race_week_num} trackData={trackData}
                                           value="shortName" season={raceItem.season_quarter} year={raceItem.season_year} linkTo="track"></TrackName>
                                <br />
                                <WeekLink date={raceItem.sessionstarttime} week={raceItem.race_week_num} epochTime={true}
                                          season={raceItem.season_quarter} year={raceItem.season_year}></WeekLink>
                            </TableItem>
                            <TableItem columns="2">
                                <RaceResultLink subsessionid={raceItem.subsessionid} val={raceItem.subsessionid}></RaceResultLink>
                            </TableItem>
                            <TableItem columns="1" val={raceItem.starting_position} isResult={true}></TableItem>
                            <TableItem columns="1" val={raceItem.finishing_position} isResult={true}></TableItem>
                            <TableItem columns="1" val={raceItem.finishing_position < compareData.myDriverData[idx].finishing_position ? 'W' : ''}></TableItem>
                            <TableItem columns="1" val={compareData.myDriverData[idx].starting_position} isResult={true}></TableItem>
                            <TableItem columns="1" val={compareData.myDriverData[idx].finishing_position} isResult={true}></TableItem>
                            <TableItem columns="1" val={raceItem.finishing_position > compareData.myDriverData[idx].finishing_position ? 'W' : ''}></TableItem>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        )
    }
}

export default DriverCompareTable;