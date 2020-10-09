import TrackName from "./TrackName";
import { calculateSeasonPoints } from '../services/Scoring';

class SeasonPoints extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pointsDetail: false,
            pointsInfo: {}
        }
    }

    pointsDetail(action) {
        this.setState({ pointsDetail: action });
    }

    togglePointsDetail() {
        this.pointsDetail(!this.state.pointsDetail);
    }

    componentDidMount() {
        const { raceData } = this.props;
        const seasonPointsData = calculateSeasonPoints(raceData);

        this.setState({ pointsInfo: seasonPointsData});
    }

    render() {
        const { trackData } = this.props;
        const { pointsInfo, pointsDetail } = this.state;

        return (
            <div className="points-container">
                <button onClick={() => this.togglePointsDetail()}>Points - {pointsInfo.totalPoints}</button>
                {pointsDetail ?
                    <React.Fragment>
                        <div className="season-points">
                            <button className="season-points-close" onClick={() => this.pointsDetail(false)}></button>
                            {pointsInfo.weeks.map(weekData => (
                                <div key={weekData.week} className={`week-pts ${weekData.inUse ? 'is-used' : ''}`}>
                                    <div><TrackName id={weekData.trackid} trackData={trackData} value="shortName"></TrackName> - {weekData.weekPoints}</div>
                                </div>
                            ))}
                        </div>
                    </React.Fragment>
                : ''}
            </div>
        );
    }
}

export default SeasonPoints;