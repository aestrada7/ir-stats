const axios = require('axios');
const Datastore = require('nedb-async').default;

/**
 * Retrieves results information from iracing's endpoints.
 * 
 * @param {Array} cookies The stored cookies for a session.
 * @param {number} custid The customer id to retrieve data from.
 * @param {number} carid The car to download data from.
 * @param {number} year The year for the iracing season.
 * @param {number} season The season quarter for the iracing season.
 * @returns {Array} The JSON data representation of the endpoint.
 */
export const getResults = async(cookies, custid, carid, year, season) => {
    const MAX_RACES = 200;
    const IRACING_DATA_URL = `https://members.iracing.com/memberstats/member/GetResults?custid=${custid}&showraces=1&showofficial=1&showrookie=1&showclassd=1&showclassc=1&showclassb=1&showclassa=1&showpro=1&showprowc=1&lowerbound=0&upperbound=${MAX_RACES}&sort=start_time&order=desc&format=json&carid=${carid}&seasonyear=${year}&seasonquarter=${season}`;

    const data = await axios.get(IRACING_DATA_URL, {
        headers: {
            'Cookie': cookies
        },
        withCredentials: true
    });

    return data;
};

/**
 * Attempts to process a provided subsession into the database. If a subsession already exists, skips it.
 * 
 * @param {number} subsessionid The subsessionid to try to retrieve data from.
 * @param {Array} cookies The stored cookies for a session.
 * @returns {number} The status code of the operation.
 */
export const processSubsession = async(subsessionid, cookies) => {
    const subsessions = new Datastore({ filename: 'data/subsessions.db', autoload: true });

    let currentSubsession = await subsessions.asyncFind({ subsessionid });
    if(currentSubsession.length !== 0) {
        console.debug(`Subsession ${subsessionid} already exists.`);
        return 302;
    }

    const IRACING_SUBSESSION_URL = `https://members.iracing.com/membersite/member/GetSubsessionResults?subsessionID=${subsessionid}`;

    //TODO: add error handling for unauthorized access (401)
    const res = await axios.get(IRACING_SUBSESSION_URL, {
        headers: {
            'Cookie': cookies
        },
        withCredentials: true
    });

    const rawSessionData = res.data.rows.filter(row => (row.simsesname === 'RACE' || row.simsestypename === 'Race'));
    const raceResults = new Datastore({ filename: 'data/raceResults.db', autoload: true });
    const drivers = new Datastore({ filename: 'data/drivers.db', autoload: true });

    const subsession = {
        subsessionid: res.data.subsessionid,
        start_time: res.data.start_time,
        eventlapscomplete: res.data.eventlapscomplete,
        seriesName: res.data.series_name,
        season_quarter: res.data.season_quarter,
        season_year: res.data.season_year,
        race_week_num: res.data.race_week_num,
        trackid: res.data.trackid,
        maxweeks: res.data.maxweeks,
        seriesid: res.data.seriesid
    };

    for(const row in rawSessionData) {
        await processSubsessionResult(raceResults, rawSessionData[row], subsession, drivers);
    }
    console.log(`Race results processed correctly for subsession ${subsessionid}.`);

    subsessions.insert(subsession, function(err, doc) {
        if(err) {
            console.error(`Error writing subsession ${subsessionid} to DB.`);
            return 503;
        }
        console.log(`Subsession ${subsessionid} successfully written.`);
        return 200;
    });
}

export const processSubsessionResult = async(raceResults, row, subsession, drivers) => {
    const raceResult = {
        finishing_position: row.pos + 1,
        starting_position: row.startpos + 1,
        laps: row.lapscomplete,
        custid: row.custid,
        carid: row.carid,
        led: row.lapslead,
        dnf: row.reasonout != 'Running',
        champpoints: row.aggchamppoints || row.champpoints,
        irating: row.newirating,
        displayname: row.displayname,
        sessionstarttime: row.sessionstarttime,
        totalLaps: subsession.eventlapscomplete,
        subsessionid: subsession.subsessionid,
        season_quarter: subsession.season_quarter,
        season_year: subsession.season_year,
        race_week_num: subsession.race_week_num,
        trackid: subsession.trackid,
        start_time: subsession.start_time,
        maxweeks: subsession.maxweeks,
        seriesid: subsession.seriesid
    };

    const driverData = {
        custid: row.custid,
        displayname: row.displayname,
        clubname: row.clubname,
        helm_color1: row.helm_color1,
        helm_color2: row.helm_color2,
        helm_color3: row.helm_color3
    };

    await processDriver(drivers, driverData);

    raceResults.insert(raceResult, function(err, doc) {
        if(err) {
            console.error(`Error writing race results for subsession ${subsessionid}, ${raceResult.custid}`);
        }
    });
};

export const processDriver = async(drivers, driverData) => {
    let currentDriver = await drivers.asyncFind({ custid: driverData.custid });
    if(currentDriver.length === 0) {
        drivers.insert(driverData, function(err, doc) {
            if(err) {
                console.error(`Error writing driver ${driverData.custid}`);
            }
        });
    }
};