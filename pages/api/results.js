import { getRaceResults } from "../../middleware/nedb";

export default async function messageHandler(req, res) {
    const { method } = req;
    const custid = parseInt(req.query.custid) || parseInt(req.body.custid);
    const carids = req.query.car || req.body.car;
    const year = req.query.year || req.body.year;
    const season = req.query.season || req.body.season;
    const week = req.query.week || req.body.week;
    let subsessionIds = req.query.subsessionIds || req.body.subsessionIds;

    if(typeof subsessionIds === 'string') {
        subsessionIds = [ parseInt(subsessionIds) ];
    }

    let searchObj = {};
    if(custid) {
        searchObj.custid = custid;
    }
    if(carids && carids.length > 0) {
        searchObj.carid = {
            $in: carids
        };
    }
    if(year) {
        searchObj.season_year = parseInt(year);
    }
    if(season) {
        searchObj.season_quarter = parseInt(season);
    }
    if(week) {
        searchObj.race_week_num = parseInt(week);
    }
    if(subsessionIds && subsessionIds.length > 0) {
        searchObj.subsessionid = {
            $in: subsessionIds
        };
    }

    switch(method) {
        case 'GET':
        case 'POST':
            let doc = await getRaceResults(searchObj);
            if(doc) {
                res.status(200).json(doc);
            } else {
                res.status(200).json({});
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} not allowed`);
            break;
    }

    return new Promise(resolve => {
        return resolve();
    });
}