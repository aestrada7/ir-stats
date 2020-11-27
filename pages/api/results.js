const Datastore = require('nedb');
var results = new Datastore({ filename: 'data/raceResults.db', autoload: true });

export default async function messageHandler(req, res) {
    return new Promise(resolve => {
        const { method } = req;
        const custid = parseInt(req.query.custid) || parseInt(req.body.custid);
        const carids = req.query.car || req.body.car;
        const year = req.query.year || req.body.year;
        const season = req.query.season || req.body.season;
        const week = req.query.week || req.body.week;
        const subsessionIds = req.query.subsessionIds || req.body.subsessionIds;

        let searchObj = {};
        searchObj.custid = custid;
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
                results.find(searchObj).sort({ start_time: -1 }).exec(function(err, doc) {
                    if(doc) {
                        res.status(200).json(doc);
                        return resolve();
                    }
                });
                break;
            default:
                res.setHeader('Allow', ['GET', 'POST']);
                res.status(405).end(`Method ${method} not allowed`);
                return resolve();
                break;
        }
    });
}