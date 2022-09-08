import { GraphQLClient, gql } from "graphql-request";

const gqlClient = new GraphQLClient('https://graphql.us.fauna.com/graphql', {
    headers: {
        authorization: `Bearer ${process.env.FAUNA_ADMIN_KEY}`
    }
})

/**
 * Retreives a driver object from the database via a GraphQL query. This function is mostly used
 * to determine if a driver already exists in the database as it doesn't return all the information.
 * 
 * @param {number} custid The identifier of the requested driver
 * @returns an object with the driver id.
 */
export const getDriver = async(custid) => {
    const query = gql`
        query driver($custid: Int!) {
            driver(custid: $custid) {
                custid
                displayname
                clubname
            }
        }
    `

    const variables = {
        custid
    }

    const data = await gqlClient.request(query, variables);
    return data;
}

/**
 * Inserts a driver to the database via a GraphQL mutation.
 * 
 * @param {object} driverData A JavaScript object that includes all the driver data that will be stored.
 * @returns an object with a subset of the inserted driver data (driver id, display name).
 */
export const insertDriver = async (driverData) => {
    const mutation = gql`
        mutation createDriver($custid: Int!, $displayname: String!, $clubname: String!, $helm_color1: String!, $helm_color2: String!, $helm_color3: String!) {
            createDriver(data: {
                custid: $custid
                displayname: $displayname
                clubname: $clubname
                helm_color1: $helm_color1
                helm_color2: $helm_color2
                helm_color3: $helm_color3
            }) {
                custid
                displayname
            }
        }
    `

    const variables = {
        custid: driverData.custid,
        displayname: driverData.displayname,
        clubname: driverData.clubname,
        helm_color1: driverData.helm_color1,
        helm_color2: driverData.helm_color2,
        helm_color3: driverData.helm_color3
    }

    const data = await gqlClient.request(mutation, variables);
    return data;
}

/**
 * Retreives a subsession object from the database via a GraphQL query. This function is mostly 
 * used to determine if a subsession already exists in the database as it doesn't return all the information.
 * 
 * @param {number} subsessionid The identifier of the requested subsession
 * @returns an object with the subsession id.
 */
export const getSubsession = async(subsessionid) => {
    const query = gql`
        query subsession($subsessionid: Int!) {
            subsession(subsessionid: $subsessionid) {
                subsessionid
            }
        }
    `

    const variables = {
        subsessionid
    }

    const data = await gqlClient.request(query, variables);
    return data;
}

/**
 * Inserts a subsession to the database via a GraphQL mutation.
 * 
 * @param {object} subsessionData A JavaScript object that includes all the season data that will be stored.
 * @returns an object with the inserted subsession id.
 */
export const insertSubsession = async (subsessionData) => {
    const mutation = gql`
        mutation createSubsession($subsessionid: Int!, $start_time: String!, $eventlapscomplete: Int!, $seriesName: String!, $season_quarter: Int!, $season_year: Int!,
                                  $race_week_num: Int!, $trackid: Int!, $maxweeks: Int!, $seriesid: Int!, $cautionlaps: Int!, $winnerid: Int!) {
            createSubsession(data: {
                subsessionid: $subsessionid
                start_time: $start_time
                eventlapscomplete: $eventlapscomplete
                seriesName: $seriesName
                season_quarter: $season_quarter
                season_year: $season_year
                race_week_num: $race_week_num
                trackid: $trackid
                maxweeks: $maxweeks
                seriesid: $seriesid
                cautionlaps: $cautionlaps
                winnerid: $winnerid
            }) {
                subsessionid
            }
        }
    `

    const variables = {
        subsessionid: subsessionData.subsessionid,
        start_time: subsessionData.start_time,
        eventlapscomplete: subsessionData.eventlapscomplete,
        seriesName: subsessionData.seriesName,
        season_quarter: subsessionData.season_quarter,
        season_year: subsessionData.season_year,
        race_week_num: subsessionData.race_week_num,
        trackid: subsessionData.trackid,
        maxweeks: subsessionData.maxweeks,
        seriesid: subsessionData.seriesid,
        cautionlaps: subsessionData.cautionlaps,
        winnerid: subsessionData.winnerid
    }

    const data = await gqlClient.request(mutation, variables);
    return data;
}

/**
 * Inserts a race result row to the database via a GraphQL mutation. A race result hold information about each individual driver within a race.
 * 
 * @param {object} raceResultData A JavaScript object that includes all the race result data that will be stored.
 * @returns an object with a subset of the recently inserted data (driver id, subsession id, finishing position).
 */
export const insertRaceResults = async (raceResultData) => {
    const mutation = gql`
        mutation createRaceResults($finishing_position: Int!, $starting_position: Int!, $laps: Int!, $custid: Int!, $carid: Int!, $led: Int!, $dnf: Boolean!,
                                   $champpoints: Int!, $irating: Int!, $irating_change: Int!, $displayname: String!, $sessionstarttime: Float!, $totalLaps: Int!,
                                   $subsessionid: Int!, $season_quarter: Int!, $season_year: Int!, $race_week_num: Int!, $trackid: Int!, $start_time: String!,
                                   $maxweeks: Int!, $seriesid: Int!, $carname: String!, $carnum: String!, $interval: Int!) {
            createRaceResult(data: {
                finishing_position: $finishing_position
                starting_position: $starting_position
                laps: $laps
                custid: $custid
                carid: $carid
                led: $led
                dnf: $dnf
                champpoints: $champpoints
                irating: $irating
                irating_change: $irating_change
                displayname: $displayname
                sessionstarttime: $sessionstarttime
                totalLaps: $totalLaps
                subsessionid: $subsessionid
                season_quarter: $season_quarter
                season_year: $season_year
                race_week_num: $race_week_num
                trackid: $trackid
                start_time: $start_time
                maxweeks: $maxweeks
                seriesid: $seriesid
                carname: $carname
                carnum: $carnum
                interval: $interval
            }) {
                subsessionid
                finishing_position
                custid
            }
        }
    `

    const variables = {
        finishing_position: raceResultData.finishing_position,
        starting_position: raceResultData.starting_position,
        laps: raceResultData.laps,
        custid: raceResultData.custid,
        carid: raceResultData.carid,
        led: raceResultData.led,
        dnf: raceResultData.dnf,
        champpoints: raceResultData.champpoints,
        irating: raceResultData.irating,
        irating_change: raceResultData.irating_change,
        displayname: raceResultData.displayname,
        sessionstarttime: raceResultData.sessionstarttime,
        totalLaps: raceResultData.totalLaps,
        subsessionid: raceResultData.subsessionid,
        season_quarter: raceResultData.season_quarter,
        season_year: raceResultData.season_year,
        race_week_num: raceResultData.race_week_num,
        trackid: raceResultData.trackid,
        start_time: raceResultData.start_time,
        maxweeks: raceResultData.maxweeks,
        seriesid: raceResultData.seriesid,
        carname: raceResultData.carname,
        carnum: raceResultData.carnum,
        interval: raceResultData.interval
    }

    const data = await gqlClient.request(mutation, variables);
    return data;
}

/**
 * Inserts a season to the database via a GraphQL mutation.
 * 
 * @param {object} seasonData A JavaScript object that includes all the season data that will be stored.
 * @returns an object with the recently inserted data.
 */
export const insertSeason = async (custid, car, year, season) => {
    const mutation = gql`
        mutation createSeason($custid: Int!, $car: Int!, $year: Int!, $season: Int!) {
            createSeason(data: {
                custid: $custid
                car: $car
                year: $year
                season: $season
            }) {
                custid
                car
                year
                season
            }
        }
    `

    const variables = {
        custid,
        car,
        year,
        season,
    }

    const data = await gqlClient.request(mutation, variables);
    return data;
}

/**
 * Retreives a season object from the database via a GraphQL query. This function is mostly 
 * used to determine if a season already exists in the database.
 * 
 * @param {number} custid the driver identifier
 * @param {number} car the car identifier
 * @param {number} year the year
 * @param {number} season the season quarter expected to retrieve
 * @returns an object with the retrieved season
 */
export const getSeason = async(custid, car, year, season) => {
    const query = gql`
        query season($custid: Int!, $car: Int!, $year: Int!, $season: Int!) {
            season(custid: $custid, car: $car, year: $year, season: $season) {
                custid
                car
                year
                season
            }
        }
    `

    const variables = {
        custid,
        car,
        year,
        season
    }

    const data = await gqlClient.request(query, variables);
    return data;
}

/**
 * Retreives a list of season objects from the database via a GraphQL query. 
 * 
 * @param {number} custid the driver identifier
 * @param {number} car the car identifier
 * @returns a list with the retrieved seasons
 */
 export const getSeasons = async(custid, car) => {
    const query = gql`
        query seasons {
            seasons {
                data {
                    custid
                    car
                    year
                    season
                }
            }
        }
    `

    const data = await gqlClient.request(query);
    return data;
}