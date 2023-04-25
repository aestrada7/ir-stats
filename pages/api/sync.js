import { processSubsession, getResults, getHostedResults } from "../../services/FetchIracing";
import { transformData } from "../../services/DataFetch";
import { getSeason, insertSeason, closeClient, getProcessLimit } from "../../middleware/db";

const axios = require('axios');
const crypto = require('crypto');
let processTruncated = false;

export default async function messageHandler(req, res) {
    const { method } = req;
    const hosted = req.query.hosted == 1;
    const car = parseInt(req.query.car);
    let year = parseInt(req.query.year);
    let season = parseInt(req.query.season);
    const username = req.query.username;
    const password = req.query.password;
    const date_from = req.query.date_from;
    const date_to = req.query.date_to;

    if(hosted) {
        season = "X";
        year = "Hosted";
    }

    switch(method) {
        case 'GET':
            console.log('=========== NEW ATTEMPT =========');
            let loginAttempt = await iracingAuthentication(username, password);
            let cust_id = loginAttempt.data?.custId;
            console.log(cust_id);
            let cookies = loginAttempt.headers['set-cookie'];
            console.log(loginAttempt.data);

            if(loginAttempt.data.authcode === 0) {
                res.status(200).json({'status': 401, 'message': 'Authentication Error. Make sure iRacing is online and that your username/password combination is correct.'});
                break;
            }

            let rawData;
            if(!hosted) {
                rawData = await getResults(cookies, cust_id, car, year, season);
            } else {
                rawData = await getHostedResults(cookies, cust_id, car, date_from, date_to);
            }

            let resultsData;
            if(!hosted) {
                resultsData = await getResultsData(rawData, cookies);
            } else {
                resultsData = await getHostedResultsData(rawData, cookies);
            }

            if(resultsData) {
                let seasonData = await getSeason(cust_id, car, year, season);
                let successMsg = `Successfully synchronized data from ${year} - Season ${season}.`;
                if(processTruncated) successMsg = `Partially synchronized subsession data from ${year} - Season ${season}. Process limit exceeded, please synchronize again.`

                if(!seasonData) {
                    let createdSeason = await insertSeason(cust_id, car, year, season);
                    if(createdSeason) {
                        await closeClient();
                        res.status(200).json({'status': 200, 'message': successMsg});
                    }
                } else {
                    await closeClient();
                    res.status(200).json({'status': 200, 'message': successMsg});
                }
            } else {
                await closeClient();
                res.status(200).json({'status': 200, 'message': `No sessions found for ${year} - Season ${season}.`});
            }
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} not allowed`);
            break;
    }

    return new Promise(resolve => {
        return resolve();
    });
}

const iracingAuthentication = async (username, password) => {
    const IRACING_LOGIN_URL = `https://members-ng.iracing.com/auth`;
    const login = await axios.post(IRACING_LOGIN_URL, {
            "email": username,
            "password": base64Pwd(username, password)
        }
    );
    return login;
}

const base64Pwd = (email, password) => {
    let str = (password + email.toLowerCase());
    let b64pwd = crypto.createHash('sha256').update(str).digest('base64');
    console.log(b64pwd);
    return b64pwd;
}

const getResultsData = async(data, cookies) => {
    let sessionsProcessed = 0;
    let processLimit = getProcessLimit();

    if(data.data.d.length === 0) {
        return null;
    }

    let transformedData = transformData(data.data);
    for(let row in transformedData) {
        let subsessionToParse = parseInt(transformedData[row].subsessionid);
        let status = await processSubsession(subsessionToParse, cookies);

        if(status === 200) {
            sessionsProcessed++;
            if((processLimit > 0) && (sessionsProcessed >= processLimit)) {
                processTruncated = true;
                break;
            }
        }
    }

    return transformedData;
}

const getHostedResultsData = async(data, cookies) => {
    for(let row in data.rows) {
        let subsessionToParse = parseInt(data.rows[row].subsessionid);
        await processSubsession(subsessionToParse, cookies);
    }

    return data.rows;
}