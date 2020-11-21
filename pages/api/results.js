const Datastore = require('nedb');
var results = new Datastore({ filename: 'data/raceResults.db', autoload: true });

export default async function messageHandler(req, res) {
    return new Promise(resolve => {
        const { method } = req;
        const custid = parseInt(req.query.custid) || parseInt(req.body.custid);
        const carid = parseInt(req.query.car) || parseInt(req.body.car);
        const year = req.query.year;
        const season = req.query.season;
        const week = req.query.week;
        const subsessionIds = req.query.subsessionIds || req.body.subsessionIds;

        let searchObj = {};
        searchObj.custid = custid;
        if(carid > -1) {
            searchObj.carid = carid;
        }
        if(subsessionIds && subsessionIds.length > 0) {
            searchObj.subsessionid = {
                $in: subsessionIds
            };
        }

        switch(method) {
            case 'GET':
            case 'POST':
                results.find(searchObj, function(err, doc) {
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