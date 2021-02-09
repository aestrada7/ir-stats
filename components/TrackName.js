import Link from 'next/link';

class TrackName extends React.Component {
    render() {
        const { id, trackData, week, value, season, year, linkTo } = this.props;
        let trackName = 'N/A';
        let trackId = 0;

        try {
            let trackObj = trackData.filter(x => x.id == id)[0];
            trackName = trackObj[value];
            trackId = trackObj.id;
        } catch(ex) {}

        return (
            <span className="track-name">
                {linkTo == "track" ?
                    <Link href={'/track/' + trackId}>
                        <a>{trackName}</a>
                    </Link>
                :
                    season ? 
                        <Link href={'/week/' + year + '/' + season + '/' + week}>
                            <a>{trackName}</a>
                        </Link>
                    :
                    trackName
                }
            </span>
        );
    }
}

export default TrackName;