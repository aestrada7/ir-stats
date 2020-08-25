import Link from 'next/link';
import React from "react";

class WeekLink extends React.Component {
    render() {
        const { date, week, season, year } = this.props;

        return (
            <Link href={'/week/' + year + '/' + season + '/' + week}>
                <a>{date} / {week + 1}</a>
            </Link>
        );
    }
}

export default WeekLink;