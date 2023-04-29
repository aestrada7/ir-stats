import { getMessages, closeClient } from '../../../middleware/db';

export default async function messageHandler(req, res) {
    const { method } = req;
    const cust_id = req.query.id[0];
    const trackId = req.query.id[1];

    switch(method) {
        case 'GET':
            let msgs = await getMessages(cust_id, trackId);
            await closeClient();
            if(msgs) {
                res.status(200).json(msgs);
            } else {
                res.status(200).json({});
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