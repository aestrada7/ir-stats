import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { decode } from '../services/Common';
import Helmet from './Helmet';

import { driverSearch } from '../services/DataFetch';

const Driver = ({ name, showHelmet, helmetColors, hasLink, id, getFromId }) => {
    let [ _name, setName ] = useState(name);
    let [ _helmetColors, setHelmetColors ] = useState(helmetColors);
    let [ _showHelmet, setShowHelmet ] = useState(showHelmet);

    useEffect(() => {
        const getDataFromId = async () => {
            let data = await driverSearch(getFromId);
            let driver = data[0];

            if(driver) {
                setName(driver?.displayname);
                setHelmetColors([driver?.helm_color1, driver?.helm_color2]);
                setShowHelmet(true);
            }
        }

        if(getFromId && getFromId != 0) {
            getDataFromId();
        }
    }, []);

    return (
        <React.Fragment>
            <span className="helmet">{_showHelmet ? <Helmet helmetColors={_helmetColors}></Helmet> : ""}</span>
            {hasLink ?
                <Link href={'/compare?id=' + id}>
                    <a className="driver-name">{decode(_name)}</a>
                </Link>
                :
                <span className="driver-name">{decode(_name)}</span>
            }
        </React.Fragment>
    );
}

export default Driver;