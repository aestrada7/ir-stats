import React, { useState, useEffect, useMemo } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

import Driver from '../components/Driver';
import { seasonList } from '../services/DataFetch';
import { BREAKPOINT_SMALL } from '../services/Common';

const Layout = ({ children, title, backButton }) => {
    let [ seasonsMenu, setSeasonsMenu ] = useState([]);
    let [ seasonsVisible, setSeasonsVisible ] = useState(false);
    let [ menuCollapsed, setMenuCollapsed ] = useState(false);

    useEffect(() => {
        setMenuCollapsed(window.innerWidth < BREAKPOINT_SMALL);
    }, []);

    const triggerPopulateSeasons = () => {
        const fetchSeasonsMenu = async () => {
            let list = await seasonList(182407, 165);
            setSeasonsMenu(list);
            setSeasonsVisible(true);
        }

        if(seasonsMenu.length > 0) {
            setSeasonsVisible(!seasonsVisible);
        } else {
            fetchSeasonsMenu();
        }
    }

    const toggleSideMenu = () => {
        setMenuCollapsed(!menuCollapsed);
    }

    return (
        <React.Fragment>
            <Head>
                <title>{title}</title>
                <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap" rel="stylesheet"></link>
            </Head>
            <div className="menu-top">
                <div className="hamburger" onClick={() => toggleSideMenu()}></div>
                <div className="logo">
                    <Link href="/">
                        <a><div className="logo-img"></div></a>
                    </Link>
                </div>
                <div className="page-title">
                    {title}
                </div>
                <div className="back">
                    {backButton && <button className="back-button" alt="back" onClick={() => Router.back()}></button>}
                </div>
                <div className="user">
                    <Driver getFromId={182407}></Driver>
                </div>
            </div>
            <div className="main-container">
                <div className={`side-menu ${menuCollapsed ? 'collapsed' : ''}`} onClick={() => menuCollapsed ? toggleSideMenu() : false}>
                    <Link href="/">
                        <div className="menu-item">
                            <a>Home</a>
                        </div>
                    </Link>
                    <Link href="/season/career">
                        <div className="menu-item">
                            <a>Career Stats</a>
                        </div>
                    </Link>
                    <Link href="/all-challenge">
                        <div className="menu-item">
                            <a>Finishing Positions</a>
                        </div>
                    </Link>
                    <Link href="/compare">
                        <div className="menu-item">
                            <a>Driver Comparison</a>
                        </div>
                    </Link>
                    <div className={`menu-item ${seasonsVisible ? 'expanded' : 'collapsed'}`} onClick={() => triggerPopulateSeasons()}>
                        <a>Seasons</a>
                    </div>
                    {seasonsMenu && seasonsMenu.map(season =>
                        <div className={`menu-item sub-menu ${seasonsVisible ? 'shown' : 'hidden'}`}>
                            <Link key={`${season.year}-${season.season}`} href={`/season/${season.year}/${season.season}`}>
                                <a>{season.year} Season {season.season}</a>
                            </Link>
                        </div>
                    )}
                </div>
                <div className={`content ${!menuCollapsed ? '' : 'full'}`}>
                    {children}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Layout;