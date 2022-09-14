import { getDrivers, closeClient } from "../../../middleware/db";
import { encode } from "../../../services/Common";

/**
 * Returns a list of drivers that match the query, either by a substring of the drivers' name or by a driver id.
 */
export default async function driverHandler(req, res) {
    const { method } = req;
    const query = encode(req.query.id);
    const maxItems = parseInt(req.query.limit) || 1000;

    switch(method) {
        case 'GET':
            let filters = { $or: [{ displayname: { $regex: new RegExp(query, 'i') } }, { custid: parseInt(query) }] };
            let docs = await getDrivers(filters, maxItems);
            await closeClient();
            if(docs) {
                res.status(200).json(docs);
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