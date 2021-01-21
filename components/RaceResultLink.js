import Link from 'next/link';
import React from 'react';

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