import { processSubsession, getResults } from "../../services/FetchIracing";
import { transformData } from "../../services/DataFetch";

const axios = require('axios');
const Datastore = require('nedb');
var results = new Datastore({ filename: 'data/results.db', autoload: true });

export default async function messageHandler(req, res) {
    const { method } = req;
    const cust_id = req.query.custid;
    const car = req.query.car;
    const year = req.query.year;
    const season = req.query.season;
    const username = req.query.username;
    const password = req.query.password;
    const irsso_v2 = req.query.irsso_v2;

    switch(method) {
        case 'GET':
            console.log('=========== NEW ATTEMPT =========');
            let loginAttempt = await iracingAuthentication(username, password);
            let cookies = loginAttempt.headers['set-cookie'];
            //To-do: this is kind of a stopgap, unable to get this through normal requests, we retrieve it manually. It works but it sucks
            cookies.push(`irsso_membersv2=${irsso_v2};`);
            let rawData = await getResults(cookies, cust_id, car, year, season);
            if(rawData.request.res.responseUrl.indexOf('notauthed.jsp') !== -1) {
                res.status(200).json({'status': 401, 'message': 'Authentication Error. Make sure the IRSSO cookie is valid.'});
                break;
            }

            let resultsData = await getResultsData(rawData, cookies);

            results.update({cust_id, car, year, season}, {cust_id, car, year, season, data: resultsData}, {upsert: true}, function(err, doc) {
                if(err) {
                    res.status(503).end(err.toString());
                }
                res.status(200).json({'status': 200, 'message': `Successfully synchronized data from ${year} - Season ${season}.`});
            });
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} not allowed`);
            break;
    }
}

const iracingAuthentication = async (username, password) => {
    const IRACING_LOGIN_URL = `https://members.iracing.com/membersite/Login`; //or .../download/Login
    let formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('utcoffset', '360');
    formData.append('todaysdate', '');

    const login = await axios.post(IRACING_LOGIN_URL, formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true
    })
    return login;
}

const getResultsData = async(data, cookies) => {
    let transformedData = transformData(data.data);
    for(let row in transformedData) {
        let subsessionToParse = parseInt(transformedData[row].subsessionid);
        await processSubsession(subsessionToParse, cookies);
    }

    return transformedData;
}