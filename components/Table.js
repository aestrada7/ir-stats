import TrackName from "./TrackName";
import TableItem from "./TableItem";
import Driver from "./Driver";
import WeekLink from "./WeekLink";
import SubsessionLink from "./SubsessionLink";

class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            raceData: this.props.raceData,
            sortingBy: null,
            order: ''
        };
    }

    sortBy(field, order) {
        let sortedData = this.state.raceData.sort((x, y) => order == "ASC" ? y[field] - x[field] : x[field] - y[field]);

        this.setState({
            raceData: sortedData,
            sortingBy: field,
            order
        });
    }

    render() {
        const { trackData } = this.props;
        const { raceData, sortingBy, order } = this.state;
        return (
            <div className="table">
                <div className="table-row flex head">
                    <TableItem columns="2" val="Date / Week"></TableItem>
                    <TableItem columns="2" val="Track"></TableItem>
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
                            <TableItem columns="2">
                                <WeekLink date={raceItem.sessionstarttime} week={raceItem.race_week_num} epochTime={true}
                                          season={raceItem.season_quarter} year={raceItem.season_year}></WeekLink>
                            </TableItem>
                            <TableItem columns="2">
                                <TrackName id={raceItem.trackid} week={raceItem.race_week_num} trackData={trackData}
                                           value="shortName" season={raceItem.season_quarter} year={raceItem.season_year} linkTo="track"></TrackName>
                            </TableItem>
                            <TableItem columns="2">
                                <Driver name={raceItem.winnerdisplayname} showHelmet={true}
                                        helmetColors={[raceItem.winnerhelmcolor1, raceItem.winnerhelmcolor2]}></Driver>
                            </TableItem>
                            <TableItem columns="1">
                                <SubsessionLink subsessionid={raceItem.subsessionid} custid={raceItem.custid} val={raceItem.champpoints}></SubsessionLink>                             
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
        )
    }
}

export default Table;