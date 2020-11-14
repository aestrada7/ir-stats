const axios = require('axios');
const Datastore = require('nedb-async').default;

/**
 * Attempts to process a provided subsession into the database. If a subsession already exists, skips it.
 * 
 * @param {number} subsessionId The subsessionId to try to retrieve data from.
 * @param {Array} cookies The stored cookies for a session.
 * @returns {number} The status code of the operation.
 */
export const processSubsession = async(subsessionId, cookies) => {
    const subsessions = new Datastore({ filename: 'data/subsessions.db', autoload: true });

    let currentSubsession = await subsessions.asyncFind({ subsessionId });
    if(currentSubsession.length !== 0) {
        console.debug(`Subsession ${subsessionId} already exists.`);
        return 302;
    }

    const IRACING_SUBSESSION_URL = `https://members.iracing.com/membersite/member/GetSubsessionResults?subsessionID=${subsessionId}`;

    //TODO: add error handling for unauthorized access (401)
    const res = await axios.get(IRACING_SUBSESSION_URL, {
        headers: {
            'Cookie': cookies
        },
        withCredentials: true
    });

    const rawSessionData = res.data.rows.filter(row => row.simsesname === 'RACE');
    const raceResults = new Datastore({ filename: 'data/raceResults.db', autoload: true });
    const drivers = new Datastore({ filename: 'data/drivers.db', autoload: true });

    const subsession = {
        subsessionId: res.data.subsessionid,
        totalLaps: res.data.eventlapscomplete,
        seriesName: res.data.series_name,
        season_quarter: res.data.season_quarter,
        season_year: res.data.season_year,
        race_week_num: res.data.race_week_num,
        trackid: res.data.trackid,
        maxweeks: res.data.maxweeks
    };

    for(const row in rawSessionData) {
        await processSubsessionResult(raceResults, rawSessionData[row], subsession, drivers);
    }
    console.log(`Race results processed correctly for subsession ${subsessionId}.`);

    subsessions.insert(subsession, function(err, doc) {
        if(err) {
            console.error(`Error writing subsession ${subsessionId} to DB.`);
            return 503;
        }
        console.log(`Subsession ${subsessionId} successfully written.`);
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
        champpoints: row.aggchamppoints,
        irating: row.newirating,
        displayname: row.displayname,
        totalLaps: subsession.eventlapscomplete,
        subsessionid: subsession.subsessionid,
        season_quarter: subsession.season_quarter,
        season_year: subsession.season_year,
        race_week_num: subsession.race_week_num,
        trackid: subsession.trackid
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
            console.error(`Error writing race results for subsession ${subsessionId}, ${raceResult.custid}`);
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