import TableItem from './TableItem';
import Driver from './Driver';
import WeekLink from './WeekLink';
import TrackName from './TrackName';

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
                            <TableItem columns="4" val="Date / Week"></TableItem>
                            <TableItem columns="4" val="Track"></TableItem>
                            <TableItem columns="2">
                                <Driver name={compareData.selectedDriverData[0].displayname} showHelmet={false}></Driver>
                            </TableItem>
                            <TableItem columns="2">
                                <Driver name={compareData.myDriverData[0].displayname} showHelmet={false}></Driver>
                            </TableItem>
                        </React.Fragment>
                    : '' }
                </div>
                { compareData.selectedDriverData && compareData.selectedDriverData.map((raceItem, idx) => (
                    <React.Fragment key={raceItem.subsessionid}>
                        <div className="table-row flex">
                            <TableItem columns="4">
                                <WeekLink date={raceItem.sessionstarttime} week={raceItem.race_week_num} epochTime={true}
                                          season={raceItem.season_quarter} year={raceItem.season_year}></WeekLink>
                            </TableItem>
                            <TableItem columns="4">
                                <TrackName id={raceItem.trackid} week={raceItem.race_week_num} trackData={trackData}
                                           value="shortName" season={raceItem.season_quarter} year={raceItem.season_year} linkTo="track"></TrackName>
                            </TableItem>
                            <TableItem columns="1" val={raceItem.starting_position} isResult={true}></TableItem>
                            <TableItem columns="1" val={raceItem.finishing_position} isResult={true}></TableItem>
                            <TableItem columns="1" val={compareData.myDriverData[idx].starting_position} isResult={true}></TableItem>
                            <TableItem columns="1" val={compareData.myDriverData[idx].finishing_position} isResult={true}></TableItem>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        )
    }
}

export default DriverCompareTable;