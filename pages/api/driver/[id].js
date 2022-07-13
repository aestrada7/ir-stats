import { getDataStore } from "../../../services/DataStore";
import { encode } from "../../../services/Common";

/**
 * Returns a list of drivers that match the query, either by a substring of the drivers' name or by a driver id.
 */
export default async function driverHandler(req, res) {
    const drivers = await getDataStore('drivers');

    return new Promise(resolve => {
        const { method } = req;
        const query = encode(req.query.id);
        const maxItems = parseInt(req.query.limit) || 1000;

        switch(method) {
            case 'GET':
                drivers.find({ $or: [{ displayname: { $regex: new RegExp(query, 'i') } }, { custid: parseInt(query) }] })
                    .limit(maxItems).sort({ displayname: 1 })
                    .exec(function(err, docs) {
                    if(err) {
                        res.status(503).json({'status': 503, 'message': 'Error retrieving data from DB.'});
                    }
                    if(docs) {
                        res.status(200).json(docs);
                    }
                    return resolve();
                });
                break;
            default:
                res.setHeader('Allow', ['GET']);
                res.status(405).end(`Method ${method} not allowed`);
                return resolve();
        }
    });
}