import { getMessage, updateMessage, closeClient } from '../../../middleware/db';

export default async function messageHandler(req, res) {
    const { method } = req;
    const cust_id = req.query.id[0];
    const car = req.query.id[1];
    const year = req.query.id[2];
    const season = req.query.id[3];
    const week = req.query.id[4];
    const trackId = req.query.id[5];
    const message = req.query.id[6];

    switch(method) {
        case 'GET':
            let msg = await getMessage(cust_id, car, year, season, week);
            await closeClient();
            if(msg) {
                res.status(200).json(msg);
            } else {
                res.status(200).json({});
            }
            break;
        case 'PUT':
            let updatedMsg = await updateMessage({cust_id, car, year, season, week, trackId}, {cust_id, car, year, season, week, trackId, message});
            await closeClient();
            if(updatedMsg) {
                res.status(200).json({'status': 200, 'message': 'Stored successfully!'});
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT']);
            res.status(405).end(`Method ${method} not allowed`);
            break;
    }

    return new Promise(resolve => {
        return resolve();
    });
}