import fetch from "isomorphic-fetch";

const SERVER_URL = `http://localhost:3000`;

/**
 * Retrieves the race data information and sends it back as a readable JSON object.
 * 
 * @param {number} year A full year as an integer
 * @param {number} season A quarter of the season (number 1,2,3 or 4)
 * @param {number} [week] The number of the week within the season (zero based).
 * @returns {object} The JSON object with the race data.
 */
export const raceDataFetch = async (year, season, week) => {
    //const SERVICE_URL = "https://members.iracing.com/memberstats/member/GetResults?custid=182407&showraces=1&showquals=0&showtts=0&showops=0&showofficial=1&showunofficial=0&showrookie=1&showclassd=1&showclassc=1&showclassb=1&showclassa=1&showpro=1&showprowc=1&lowerbound=0&upperbound=25&sort=start_time&order=desc&format=json&category%5B%5D=1&seasonyear=2020&seasonquarter=3";
    const car = 'dallara-ir18';
    const STATS_SERVICE_URL = `${SERVER_URL}/api/${car}/stats-${year}-s${season}.json`;
    const response = await fetch(STATS_SERVICE_URL);
    const data = await response.json();

    const STATS_ADDENDUM_SERVICE_URL = `${SERVER_URL}/api/${car}/stats-${year}-s${season}-addendum.json`;
    const responseAdd = await fetch(STATS_ADDENDUM_SERVICE_URL);
    const dataAdd = await responseAdd.json();

    let transformedData = transformData(data, week);
    return appendData(transformedData, dataAdd);
}

/**
 * Retrieves race data information from all available seasons and sends it back as a readable JSON object.
 * 
 * @returns {object} The JSON object with the race data.
 */
export const raceDataFetchAll = async () => {
    //to do: improve this, this sucks
    const raceData15S3 = await raceDataFetch(2015, 3);
    const raceData18S4 = await raceDataFetch(2018, 4);
    const raceData19S3 = await raceDataFetch(2019, 3);
    const raceDataS2 = await raceDataFetch(2020, 2);
    const raceDataS3 = await raceDataFetch(2020, 3);

    return raceDataS3.concat(raceDataS2).concat(raceData19S3).concat(raceData18S4).concat(raceData15S3);
}

/**
 * Retrieves the track data information and sends it back as a readable JSON object.
 * 
 * @returns {object} The JSON object with the track data.
 */
export const trackDataFetch = async () => {
    const TRACK_SERVICE_URL = `${SERVER_URL}/api/track-data.json`;

    const trackResponse = await fetch(TRACK_SERVICE_URL);
    return await trackResponse.json();
}

/**
 * Takes raw data from iRacing's API and transforms it to a readable form.
 * 
 * @param {object} data The object including the raw data as it comes from iRacing's API.
 * @param {number} [week] The number of the week within the season (zero based).
 * @returns {object} A new object with readable properties.
 */
function transformData(data, week) {
    let newData = [];
    newData = data.d.r.map(x => renameProps(x, data.m));

    if(week) {
        newData = newData.filter(x => x.race_week_num == week);
    }

    return newData;
}

/**
 * Generates new fields in readable form and attaches them to a new object.
 * 
 * @param {object} item The individual object in an array with the raw values.
 * @param {string} dictionary The key value pair with the definition of each field.
 * @returns {object} A new individual object with readable properties.
 */
function renameProps(item, dictionary) {
    let newItem = {};
    for (const key in item) {
        newItem[dictionary[key]] = item[key];
    }
    return newItem;
}

/**
 * Appends missing data to the iracing's API object (done manually unfortunately - hopefully this will change in the future)
 * 
 * @param {object} data The original transformed data from iracing's API
 * @param {object} newData The missing data object.
 * @returns {object} An item with the appended properties
 */
function appendData(data, newData) {
    for(const item in newData) {
        let subsessionId = newData[item].subsessionId;

        data.map(x => {
            if(subsessionId == x.subsessionid) {
                x = Object.assign(x, newData[item]);
            }
        });
    }
    return data;
}