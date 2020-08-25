import Link from "next/link";
import TrackName from "./TrackName";

class AllPositionsItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            detail: false
        };
    }

    toggleDetail() {
        this.setState({ detail: !this.state.detail });
    }

    render() {
        const { trackData, positionItem } = this.props;
        const { detail } = this.state;

        return (
            <div className="position-item">
                <div className="position">
                    {positionItem.position}
                </div>
                <div className={`frequency ${positionItem.total > 0 ? "achieved" : "" }`}>
                    {positionItem.total}
                </div>
                <div className="detail">
                    <button className={`toggleDetail ${positionItem.total <= 1 ? "hide" : "" }`} onClick={() => this.toggleDetail()}>
                        {`${detail ? 'Expand' : 'Collapse'}`}
                    </button>
                    {!detail && positionItem.track_season.map(track => (
                        <React.Fragment>
                            <Link href={`/week/${track.year}/${track.season}/${track.week}`}>
                                <div className="detail-link">
                                    <span>{track.year}</span>
                                    <span> S{track.season}</span>
                                    <span> <TrackName id={track.trackid} trackData={trackData} value="shortName"></TrackName></span>
                                </div>
                            </Link>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        );
    }
}

export default AllPositionsItem;