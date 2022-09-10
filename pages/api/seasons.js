import { getSeasons } from '../../middleware/nedb';

export default async function messageHandler(req, res) {
    const { method } = req;
    const custid = parseInt(req.query.custid);
    const seriesid = req.query.seriesid;

    let searchObj = {};
    searchObj.cust_id = custid;
    //searchObj.seriesid = seriesid;

    switch(method) {
        case 'GET':
            let seasonsRes = await getSeasons(custid);
            res.status(200).json(seasonsRes);
            /*
            const doc = await results.find(searchObj).sort({ year: -1, season: -1 });
            res.status(200).json(doc);*/
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