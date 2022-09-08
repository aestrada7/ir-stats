import { getSeasons } from '../../middleware/fauna';

export default async function messageHandler(req, res) {
    const { method } = req;
    const custid = req.query.custid;
    const seriesid = req.query.seriesid;

    let searchObj = {};
    searchObj.cust_id = custid;
    //searchObj.seriesid = seriesid;

    switch(method) {
        case 'GET':
            let seasonsRes = await getSeasons(custid);
            res.status(200).json(seasonsRes.seasons.data);
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} not allowed`);
            break;
    }
}