const Datastore = require('nedb');
var results = new Datastore({ filename: 'data/results.db', autoload: true });

export default async function messageHandler(req, res) {
    return new Promise(resolve => {
        const { method } = req;
        const custid = req.query.custid;
        const seriesid = req.query.seriesid;

        let searchObj = {};
        searchObj.cust_id = custid;
        //searchObj.seriesid = seriesid;

        switch(method) {
            case 'GET':
                results.find(searchObj).sort({ year: -1, season: -1 }).exec(function(err, doc) {
                    if(doc) {
                        res.status(200).json(doc);
                        return resolve();
                    }
                });
                break;
            default:
                res.setHeader('Allow', ['GET']);
                res.status(405).end(`Method ${method} not allowed`);
                return resolve();
                break;
        }
    });
}