import React, { useState, useEffect } from 'react';

import TrackName from './TrackName';
import { calculateSeasonPoints } from '../services/Scoring';

const SeasonPoints = ({ trackData, raceData }) => {
    const [ pointsDetail, setPointsDetail ] = useState(false);
    const [ pointsInfo, setPointsInfo ] = useState({});

    const togglePointsDetail = () => {
        setPointsDetail(!pointsDetail);
    }

    useEffect(() => {
        const seasonPointsData = calculateSeasonPoints(raceData);
        setPointsInfo(seasonPointsData);
    }, []);

    return (
        <div className="points-container">
            <button onClick={() => togglePointsDetail()}>Points - {pointsInfo.totalPoints}</button>
            {pointsDetail ?
                <React.Fragment>
                    <div className="season-points">
                        <button className="season-points-close" onClick={() => setPointsDetail(false)}></button>
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

export default SeasonPoints;