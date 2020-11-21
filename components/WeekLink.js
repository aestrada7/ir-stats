import Link from 'next/link';
import React from 'react';
import { formatEpoch } from '../services/Common';

class WeekLink extends React.Component {
    render() {
        const { date, week, season, year, epochTime } = this.props;

        return (
            <Link href={'/week/' + year + '/' + season + '/' + week}>
                <a>{epochTime ? formatEpoch(date) : date} / {week + 1}</a>
            </Link>
        );
    }
}

export default WeekLink;