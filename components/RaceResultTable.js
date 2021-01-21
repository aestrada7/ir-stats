import TableItem from "./TableItem";
import Driver from "./Driver";

class RaceResultTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sessionData: this.props.sessionData,
            sortingBy: null,
            order: ''
        };
    }

    sortBy(field, order) {
        let sortedData = this.state.sessionData.sort((x, y) => order == "ASC" ? y[field] - x[field] : x[field] - y[field]);

        this.setState({
            sessionData: sortedData,
            sortingBy: field,
            order
        });
    }

    render() {
        const { sessionData, sortingBy, order } = this.state;
        return (
            <div className="table">
                <div className="table-row flex head">
                    <TableItem columns="1" val="Finish" fieldToSortBy="finishing_position" parent={this} sortingBy={sortingBy} order={order}></TableItem>
                    <TableItem columns="1" val="Start" fieldToSortBy="starting_position" parent={this} sortingBy={sortingBy} order={order}></TableItem>
                    <TableItem columns="4" val="Driver"></TableItem>
                    <TableItem columns="1" val="Points" fieldToSortBy="champpoints" parent={this} sortingBy={sortingBy} order={order}></TableItem>
                    <TableItem columns="1" val="Laps"></TableItem>
                    <TableItem columns="1" val="Led" fieldToSortBy="led" parent={this} sortingBy={sortingBy} order={order}></TableItem>
                    <TableItem columns="1" val="iRating" fieldToSortBy="irating" parent={this} sortingBy={sortingBy} order={order}></TableItem>
                    <TableItem columns="1" val="DNF"></TableItem>
                </div>
                { sessionData.map(raceItem => (
                    <React.Fragment key={raceItem.subsessionid}>
                        <div className="table-row flex">
                            <TableItem columns="1" val={raceItem.finishing_position} isResult={true}></TableItem>
                            <TableItem columns="1" val={raceItem.starting_position} isResult={true}></TableItem>
                            <TableItem columns="4">
                                <Driver name={raceItem.displayname} showHelmet={false} hasLink={true} id={raceItem.custid}></Driver>
                            </TableItem>
                            <TableItem columns="1" val={raceItem.champpoints} defaultVal="0"></TableItem>
                            <TableItem columns="1" val={raceItem.laps} defaultVal="0"></TableItem>
                            <TableItem columns="1" val={raceItem.led} defaultVal="0"></TableItem>
                            <TableItem columns="1" val={raceItem.irating}></TableItem>
                            <TableItem columns="1" val={raceItem.dnf}></TableItem>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        )
    }
}

export default RaceResultTable;