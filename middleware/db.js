let db;
let PROCESS_LIMIT;

if(process.env.ENV === "PROD") {
    db = await import('./mongo.js');
    PROCESS_LIMIT = 20;
} else {
    db = await import('./nedb.js');
    PROCESS_LIMIT = -1;
}

/**
 * Does nothing, used only locally.
 */
export const closeClient = async() => {
    await db.closeClient();
}

/**
 * Retreives a driver object from the database. This function is mostly used
 * to determine if a driver already exists in the database.
 * 
 * @param {number} custid The identifier of the requested driver.
 * @returns an object with the driver id.
 */
export const getDriver = async(custid) => {
    const data = await db.getDriver(custid);
    return data;
}

/**
 * Retrieves a list of drivers from the database. It sorts the output alphabetically
 * and enforces a minimum limit of 5 items.
 * 
 * @param {object} filter A JavaScript object that includes the filters that should be applied to the search.
 * @param {number} maxItems A number with the maximum number of results to be returned.
 * @returns A list of drivers sorted by display name.
 */
export const getDrivers = async(filter, maxItems = 5) => {
    const data = await db.getDrivers(filter, maxItems);
    return data;
}

/**
 * Inserts a driver to the database.
 * 
 * @param {object} driverData A JavaScript object that includes all the driver data that will be stored.
 * @returns an object with the inserted driver data.
 */
export const insertDriver = async (driverData) => {
    const data = await db.insertDriver(driverData);
    return data;
}

/**
 * Retreives a subsession object from the database. This function is mostly 
 * used to determine if a subsession already exists in the database.
 * 
 * @param {number} subsessionid The identifier of the requested subsession
 * @returns an object with the requested subsession.
 */
export const getSubsession = async(subsessionid) => {
    const data = await db.getSubsession(subsessionid);
    return data;
}

/**
 * Retreives a list of subsession objects from the database.
 * 
 * @param {object} filter A JavaScript object that includes the filters that should be applied to the search.
 * @returns an object with the filtered data.
 */
export const getSubsessions = async(filter) => {
    const data = await db.getSubsessions(filter);
    return data;
}

/**
 * Inserts a subsession to the database.
 * 
 * @param {object} subsessionData A JavaScript object that includes all the season data that will be stored.
 * @returns an object with the inserted subsession.
 */
export const insertSubsession = async (subsessionData) => {
    const data = await db.insertSubsession(subsessionData);
    return data;
}

/**
 * Inserts a race result row to the database. A race result holds information about each individual
 * driver within a race.
 * 
 * @param {object} raceResultData A JavaScript object that includes all the race result data that will be stored.
 * @returns an object with the recently inserted data.
 */
export const insertRaceResults = async (raceResultData) => {
    const data = await db.insertRaceResults(raceResultData);
    return data;
}

/**
 * Retrieves a list of race results given a provided criteria, sorts the output by start time.
 * 
 * @param {object} filter A JavaScript object that includes the filters that should be applied to the search.
 * @returns an object with the filtered data.
 */
export const getRaceResults = async (filter) => {
    const data = await db.getRaceResults(filter);
    return data;
}

/**
 * Inserts a season to the database.
 * 
 * @param {object} seasonData A JavaScript object that includes all the season data that will be stored.
 * @returns an object with the recently inserted data.
 */
export const insertSeason = async (custid, car, year, season) => {
    const data = await db.insertSeason(custid, car, year, season);
    return data;
}

/**
 * Retreives a season object from the database. This function is mostly 
 * used to determine if a season already exists in the database.
 * 
 * @param {number} custid the driver identifier
 * @param {number} car the car identifier
 * @param {number} year the year
 * @param {number} season the season quarter expected to retrieve
 * @returns an object with the retrieved season
 */
export const getSeason = async(custid, car, year, season) => {
    const data = await db.getSeason(custid, car, year, season);
    return data;
}

/**
 * Retreives a list of season objects from the database. 
 * 
 * @param {number} custid the driver identifier
 * @param {number} car the car identifier
 * @returns a list with the retrieved seasons
 */
export const getSeasons = async(custid, car) => {
    const data = await db.getSeasons(custid, car);
    return data;
}

/**
 * Retrieves a single message from the DB.
 * 
 * @param {number} cust_id
 * @param {number} car
 * @param {number} year 
 * @param {number} season 
 * @param {number} week 
 * @returns The message stored in the DB or null if nothing's found.
 */
export const getMessage = async(cust_id, car, year, season, week) => {
    const data = await db.getMessage(cust_id, car, year, season, week);
    return data;
}

/**
 * Updates or creates a message from a provided message object. If a message doesn't exist, a new
 * one will be created, otherwise, it will update the existing one.
 * 
 * @param {object} originalObj The original object to look for in the database in order to update.
 * @param {object} newObj The new data that will be inserted.
 * @returns The updated message.
 */
export const updateMessage = async(originalObj, newObj) => {
    const data = await db.updateMessage(originalObj, newObj);
    return data;
}

/**
 * Returns the subsession process limit per sync call.
 * 
 * @returns Integer with the process limit.
 */
export const getProcessLimit = () => {
    return PROCESS_LIMIT;
}