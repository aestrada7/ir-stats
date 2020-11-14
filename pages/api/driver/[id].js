const Datastore = require('nedb');
var drivers = new Datastore({ filename: 'data/drivers.db', autoload: true });

/**
 * Returns a list of drivers that match the query, either by a substring of the drivers' name or by a driver id.
 */
export default async function driverHandler(req, res) {
    return new Promise(resolve => {
        const { method } = req;
        const query = req.query.id;
        const maxItems = parseInt(req.query.limit) || 1000;

        switch(method) {
            case 'GET':
                drivers.find({ $or: [{ displayname: { $regex: new RegExp(query, 'i') } }, { custid: parseInt(query) }] }).limit(maxItems).exec(function(err, docs) {
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