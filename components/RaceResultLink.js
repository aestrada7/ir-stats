import React from 'react';
import Link from 'next/link';

class RaceResultLink extends React.Component {
    render() {
        const { subsessionid, val } = this.props;

        return (
            <Link href={'/race/' + subsessionid}>
                <a>{val}</a>
            </Link>
        );
    }
}

export default RaceResultLink;