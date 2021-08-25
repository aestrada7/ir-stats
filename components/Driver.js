import React from 'react';
import Link from 'next/link';

import { decode } from '../services/Common';
import Helmet from './Helmet';

class Driver extends React.Component {
    render() {
        const { name, showHelmet, helmetColors, hasLink, id } = this.props;

        return (
            <React.Fragment>
                <span className="helmet">{showHelmet ? <Helmet helmetColors={helmetColors}></Helmet> : ""}</span>
                {hasLink ?
                    <Link href={'/compare?id=' + id}>
                        <a className="driver-name">{decode(name)}</a>
                    </Link>
                    :
                    <span className="driver-name">{decode(name)}</span>
                }
            </React.Fragment>
        );
    }
}

export default Driver;