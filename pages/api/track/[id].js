const Datastore = require('nedb');
const axios = require('axios');
import { encode } from "../../../services/Common";
import * as Config from "../../../services/Config";

var tracks = new Datastore({ inMemoryOnly: true });

/**
 * Returns a list of tracks that match the query, either by a substring of the tracks' name or by a track id.
 */
export default async function trackHandler(req, res) {
    const trackData = await getTrackData();
    tracks.remove({}, { multi: true });
    tracks.insert(trackData.data);

    return new Promise(resolve => {
        const { method } = req;
        const query = encode(req.query.id);
        const maxItems = parseInt(req.query.limit) || 1000;

        switch(method) {
            case 'GET':
                tracks.find({ $or: [{ name: { $regex: new RegExp(query, 'i') } }, { id: parseInt(query) }] })
                    .limit(maxItems).sort({ name: 1 })
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

const getTrackData = async() => {
    const TRACK_SERVICE_URL = `${Config.SERVER_URL}/api/track-data.json`;
    return await axios.get(TRACK_SERVICE_URL);
}