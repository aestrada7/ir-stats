const Datastore = require('nedb');
var messages = new Datastore({ filename: 'data/messages.db', autoload: true });

export default function messageHandler(req, res) {
    return new Promise(resolve => {
        const { method } = req;
        const cust_id = req.query.id[0];
        const car = req.query.id[1];
        const year = req.query.id[2];
        const season = req.query.id[3];
        const week = req.query.id[4];
        const message = req.query.id[5];
    
        switch(method) {
            case 'GET':
                messages.findOne({cust_id, car, year, season, week}, function(err, doc) {
                    if(err) {
                        res.status(503).end(err.toString());
                    }
                    if(doc) {
                        res.status(200).json(doc);
                    } else {
                        res.status(200).json({});
                    }
                    return resolve();
                });
                break;
            case 'PUT':
                messages.update({cust_id, car, year, season, week}, {cust_id, car, year, season, week, message}, {upsert: true}, function(err, doc) {
                    if(err) {
                        res.status(503).end(err.toString());
                    }
                    res.status(200).json({'status': 200, 'message': 'Stored successfully!'});
                    return resolve();
                });
                break;
            default:
                res.setHeader('Allow', ['GET', 'PUT']);
                res.status(405).end(`Method ${method} not allowed`);
                return resolve();
                break;
        }
    });
}