import { getDataStore } from '../../services/DataStore';

export default async function messageHandler(req, res) {
    var results = await getDataStore('results');

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
                }
            });
            /*
            const doc = await results.find(searchObj).sort({ year: -1, season: -1 });
            res.status(200).json(doc);*/
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} not allowed`);
            break;
    }
}