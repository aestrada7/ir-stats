import WeekItem from './WeekItem';

class WeekTable extends React.Component {
    render() {
        const { weekData } = this.props;
        return (
            <React.Fragment>
                <div className="week-data">
                    <WeekItem caption="Races" value={weekData.races}></WeekItem>
                    <WeekItem caption="Wins" value={weekData.wins} hover={weekData.winPercentage}></WeekItem>
                    <WeekItem caption="Top 5s" value={weekData.top5s} hover={weekData.top5Percentage}></WeekItem>
                    <WeekItem caption="Top 10s" value={weekData.top10s} hover={weekData.top10Percentage}></WeekItem>
                    <WeekItem caption="Poles" value={weekData.poles}></WeekItem>
                    <WeekItem caption="Laps Led" value={weekData.lapsLed}></WeekItem>
                    <WeekItem caption="Total Laps" value={weekData.totalLaps}></WeekItem>
                    <WeekItem caption="Laps Completed" value={weekData.actualLaps} hover={weekData.actualLapsPercentage}></WeekItem>
                    <WeekItem caption="DNFs" value={weekData.dnfs} hover={weekData.dnfPercentage}></WeekItem>
                    <WeekItem caption="Average Start" value={weekData.avgStart}></WeekItem>
                    <WeekItem caption="Average Finish" value={weekData.avgFinish}></WeekItem>
                    <WeekItem caption="Avg.Fin. (No DNF)" value={weekData.avgFinishSansDnfs}></WeekItem>
                    <WeekItem caption="Best Result" value={weekData.bestResult}></WeekItem>
                </div>
            </React.Fragment>
        );
    }
}

export default WeekTable;