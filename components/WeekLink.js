import React from 'react';
import Link from 'next/link';

import { formatEpoch } from '../services/Common';

class WeekLink extends React.Component {
    render() {
        const { date, week, season, year, showSeason, epochTime } = this.props;

        return (
            <Link href={'/week/' + year + '/' + season + '/' + week}>
                <a>
                    {showSeason ?
                        <span className="season-indicator">{year} S{season}</span>
                    : '' }
                    <span className="date-container">{epochTime ? formatEpoch(date) : date}</span>
                    <span className="week-indicator">Week {week + 1}</span>
                </a>
            </Link>
        );
    }
}

export default WeekLink;