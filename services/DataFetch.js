const axios = require('axios');
import fetch from "isomorphic-fetch";
import * as Config from "./Config";

/**
 * Retrieves the race data information and sends it back as a readable JSON object.
 * 
 * @param {number} year A full year as an integer
 * @param {number} season A quarter of the season (number 1,2,3 or 4)
 * @param {number} [week] The number of the week within the season (zero based).
 * @returns {object} The JSON object with the race data.
 */
export const raceDataFetch = async (year, season, week) => {
    // to-do: use seriesid instead of carid, as that will only break stuff
    const winnerData = await subsessionWinnerData();
    const raceData = await raceResultsFetch(182407, [99, 57], year, season, week);
    return appendData(raceData, winnerData);
}

/**
 * Retrieves race data information from all available seasons and sends it back as a readable JSON object.
 * 
 * @returns {object} The JSON object with the race data.
 */
export const raceDataFetchAll = async () => {
    const winnerData = await subsessionWinnerData();
    const raceData = await raceResultsFetch(182407, [99, 57]);
    return appendData(raceData, winnerData);
}

/**
 * Retrieves the track data information and sends it back as a readable JSON object.
 * 
 * @returns {object} The JSON object with the track data.
 */
export const trackDataFetch = async () => {
    const TRACK_SERVICE_URL = `${Config.SERVER_URL}/api/track-data.json`;

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
export const transformData = (data, week) => {
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
 * Appends data to the iracing's API object
 * 
 * @param {object} data The original transformed data from iracing's API
 * @param {object} newData The missing data object.
 * @returns {object} An item with the appended properties
 */
function appendData(data, newData) {
    for(const item in newData) {
        let subsessionid = newData[item].subsessionid;

        data.map(x => {
            if(subsessionid == x.subsessionid) {
                x = Object.assign(x, newData[item]);
            }
        });
    }
    return data;
}

/**
 * Stores information given a provided key. Uses NeDB.
 * 
 * @param {string} year The year that will be used as part of the key.
 * @param {string} season The season that will be used as part of the key.
 * @param {string} week The week that will be used as part of the key.
 * @param {number} car The car that will be used as part of the key.
 * @param {string} value The value that will be stored.
 * @returns null
 */
export const messageSet = async (year, season, week, car, value) => {
    const MESSAGE_API_URL = `${Config.SERVER_URL}/api/message/182407/${car}/${year}/${season}/${week}/${escape(value)}`;
    const messageResponse = await fetch(MESSAGE_API_URL, {method: `PUT`});
    console.log(await messageResponse.json());
}

/**
 * Retrieves information given a provided key. Uses NeDB.
 * 
 * @param {string} year The year that will be used as part of the key.
 * @param {string} season The season that will be used as part of the key.
 * @param {string} week The week that will be used as part of the key.
 * @param {number} car The car that will be used as part of the key.
 * @returns {string} The stored value in the provided key.
 */
export const messageGet = async (year, season, week, car) => {
    const MESSAGE_API_URL = `${Config.SERVER_URL}/api/message/182407/${car}/${year}/${season}/${week}`;
    const messageResponse = await fetch(MESSAGE_API_URL);
    const messageObj = await messageResponse.json();
    return messageObj.message;
}

/**
 * Retrieves information given a provided key. Uses localStorage.
 * 
 * @param {string} year The year that will be used as part of the key.
 * @param {string} season The season that will be used as part of the key.
 * @param {string} week The week that will be used as part of the key.
 * @param {number} car The car that will be used as part of the key.
 * @returns {string} The stored value in the provided key.
 */
export const messageGetLocal = (year, season, week, car) => {
    return localStorage.getItem(`ir-stats-${year}-${season}-${week}-${car}`);
}

/**
 * Stores information given a provided key. Uses localStorage.
 * 
 * @param {string} year The year that will be used as part of the key.
 * @param {string} season The season that will be used as part of the key.
 * @param {string} week The week that will be used as part of the key.
 * @param {number} car The car that will be used as part of the key.
 * @param {string} value The value that will be stored.
 * @returns null
 */
export const messageSetLocal = async (year, season, week, car, value) => {
    localStorage.setItem(`ir-stats-${year}-${season}-${week}-${car}`, value);
}

/**
 * Retrieves driver data information and sends it back as a readable JSON object.
 * 
 * @param {string} text A part of the name to search for, or a driver id.
 * @returns {object} The JSON object with the driver data.
 */
export const driverSearch = async (text) => {
    if(text) {
        const MAX_ITEMS = 5;
        const DRIVER_SERVICE_URL = `./api/driver/${text}?limit=${MAX_ITEMS}`;

        const response = await fetch(DRIVER_SERVICE_URL);
        const data = await response.json();

        return data;
    } else {
        return [];
    }
}

/**
 * Retrieves the race data information and sends it back as a readable JSON object.
 * 
 * @param {number} custid The driver id.
 * @param {Array[number]} car The car ids to use.
 * @param {number} [year] A full year as an integer, use -1 for any year
 * @param {number} [season] A quarter of the season (number 1,2,3 or 4), use -1 for any season
 * @param {number} [week] The number of the week within the season (zero based), use -1 for any week
 * @param {number} [subsessionIds] An array of subsessionIds to filter by.
 * @returns {object} The JSON object with the race data.
 */
export const raceResultsFetch = async (custid, car, year, season, week, subsessionIds) => {
    const RESULTS_SERVICE_URL = `${Config.SERVER_URL}/api/results`;

    const response = await axios.post(RESULTS_SERVICE_URL, {
        custid,
        car,
        year,
        season,
        week,
        subsessionIds
    });

    return response.data;
}

/**
 * Wrapper for the Synchronization API, which attempts to grab information from iracing's servers to store it in ir-stats
 * database. This is done per season.
 * 
 * @param {string} username Username (email) of an iracing account.
 * @param {string} password Password of said account.
 * @param {number} custid The customer ID which we'll be using to filter results.
 * @param {number} car The car id that will be used.
 * @param {number} year The year of the season that will be retrieved.
 * @param {number} season The season quarter that will be retrieved.
 * @param {string} irsso_v2 A stop-gap that likely will be removed in the future, this is the value of the irsso cookie set by
 *                          iracing's login. Use this instead of username/password combination, provided it's copied from a valid request
 * @returns {object} The JSON response provided by the Synchronization API.
 */
export const seasonSync = async (username, password, custid, car, year, season, irsso_v2) => {
    const SYNC_SERVICE_URL = `./api/sync?username=${username}&password=${password}&custid=${custid}&car=${car}&year=${year}&season=${season}&irsso_v2=${irsso_v2}`;
    const response = await axios.get(SYNC_SERVICE_URL);
    return response.data;
}

/**
 * Retrieves all existing seasons stored in the database.
 * 
 * @param {number} custid The customer id to filter by.
 * @param {number} seriesid The series id to filter by.
 * @returns {object} The JSON object with all recorded seasons for the filtered combination.
 */
export const seasonList = async(custid, seriesid) => {
    const SEASON_SERVICE_URL = `./api/seasons?custid=${custid}&seriesid=${seriesid}`;
    const response = await axios.get(SEASON_SERVICE_URL);
    return response.data;
}

/**
 * Retrieves all subsession data
 * 
 * @returns {object} A JSON object with all the data.
 */
export const subsessionWinnerData = async() => {
    const SUBSESSION_SERVICE_URL = `${Config.SERVER_URL}/api/subsession`;
    const response = await axios.get(SUBSESSION_SERVICE_URL);
    return response.data;
}