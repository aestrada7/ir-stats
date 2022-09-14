const Datastore = require('nedb-async').default;

/**
 * Does nothing, used only locally.
 */
export const closeClient = async() => {}

/**
 * Retrieves an NeDB object to perform CRUD operations with.
 * 
 * @param {string} collectionName The collection name that will be used.
 * @returns A datastore object from NeDB which can be used for CRUD operations.
 */
const getDataStore = (collectionName) => {
    const dataStoreFile = `data/${collectionName}.db`;
    const store = new Datastore({ filename: dataStoreFile, autoload: true });
    return store;
}

/**
 * Retreives a driver object from the database via an NeDB query. This function is mostly used
 * to determine if a driver already exists in the database.
 * 
 * @param {number} custid The identifier of the requested driver.
 * @returns an object with the driver id.
 */
export const getDriver = async(custid) => {
    const drivers = getDataStore('drivers');
    const data = await drivers.asyncFindOne({ custid });
    return data;
}

/**
 * Retrieves a list of drivers from the database via an NeDB query. It sorts the output alphabetically
 * and enforces a minimum limit of 5 items.
 * 
 * @param {object} filter A JavaScript object that includes the filters that should be applied to the search.
 * @param {number} maxItems A number with the maximum number of results to be returned.
 * @returns A list of drivers sorted by display name.
 */
export const getDrivers = async(filter, maxItems = 5) => {
    const drivers = getDataStore('drivers');
    const data = await drivers.asyncFind(filter, [['sort', { displayname: 1 }], ['limit', maxItems]]);
    return data;
}

/**
 * Inserts a driver to the database via an NeDB insert.
 * 
 * @param {object} driverData A JavaScript object that includes all the driver data that will be stored.
 * @returns an object with the inserted driver data.
 */
export const insertDriver = async (driverData) => {
    const drivers = getDataStore('drivers');
    const data = await drivers.asyncInsert(driverData);
    return data;
}

/**
 * Retreives a subsession object from the database via an NeDB query. This function is mostly 
 * used to determine if a subsession already exists in the database.
 * 
 * @param {number} subsessionid The identifier of the requested subsession
 * @returns an object with the requested subsession.
 */
export const getSubsession = async(subsessionid) => {
    const subsessions = getDataStore('subsessions');
    const data = await subsessions.asyncFindOne({ subsessionid });
    return data;
}

/**
 * Retreives a list of subsession objects from the database via an NeDB query.
 * 
 * @param {object} filter A JavaScript object that includes the filters that should be applied to the search.
 * @returns an object with the filtered data.
 */
export const getSubsessions = async(filter) => {
    const subsessions = getDataStore('subsessions');
    const data = await subsessions.asyncFind(filter)
    return data;
}

/**
 * Inserts a subsession to the database via an NeDB insert.
 * 
 * @param {object} subsessionData A JavaScript object that includes all the season data that will be stored.
 * @returns an object with the inserted subsession.
 */
export const insertSubsession = async (subsessionData) => {
    const subsessions = getDataStore('subsessions');
    const data = await subsessions.asyncInsert(subsessionData);
    return data;
}

/**
 * Inserts a race result row to the database via an NeDB insert. A race result holds information about each individual
 * driver within a race.
 * 
 * @param {object} raceResultData A JavaScript object that includes all the race result data that will be stored.
 * @returns an object with the recently inserted data.
 */
export const insertRaceResults = async (raceResultData) => {
    const raceResults = getDataStore('raceResults');
    const data = await raceResults.asyncInsert(raceResultData);
    return data;
}

/**
 * Retrieves a list of race results given a provided criteria, sorts the output by start time.
 * 
 * @param {object} filter A JavaScript object that includes the filters that should be applied to the search.
 * @returns an object with the filtered data.
 */
export const getRaceResults = async (filter) => {
    const raceResults = getDataStore('raceResults');
    const data = await raceResults.asyncFind(filter, [['sort', { start_time: -1, finishing_position: 1 }]]);
    return data;
}

/**
 * Inserts a season to the database via an NeDB insert.
 * 
 * @param {object} seasonData A JavaScript object that includes all the season data that will be stored.
 * @returns an object with the recently inserted data.
 */
export const insertSeason = async (custid, car, year, season) => {
    const seasons = getDataStore('seasons');
    const data = await seasons.asyncInsert({ custid, car, year, season });
    return data;
}

/**
 * Retreives a season object from the database via an NeDB query. This function is mostly 
 * used to determine if a season already exists in the database.
 * 
 * @param {number} custid the driver identifier
 * @param {number} car the car identifier
 * @param {number} year the year
 * @param {number} season the season quarter expected to retrieve
 * @returns an object with the retrieved season
 */
export const getSeason = async(custid, car, year, season) => {
    const seasons = getDataStore('seasons');
    const data = await seasons.asyncFindOne({ custid, car, year, season });
    return data;
}

/**
 * Retreives a list of season objects from the database via an NeDB query. 
 * 
 * @param {number} custid the driver identifier
 * @param {number} car the car identifier
 * @returns a list with the retrieved seasons
 */
export const getSeasons = async(custid, car) => {
    const seasons = getDataStore('seasons');
    const data = await seasons.asyncFind({ custid }, [['sort', { year: -1, season: -1 }]]);
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
    const messages = getDataStore('messages');
    const data = await messages.asyncFindOne({cust_id, car, year, season, week});
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
    const messages = getDataStore('messages');
    const data = await messages.asyncUpdate(originalObj, newObj, { upsert: true });
    return data;
}