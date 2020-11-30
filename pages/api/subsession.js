const Datastore = require('nedb-async').default;
var subsessions = new Datastore({ filename: 'data/subsessions.db', autoload: true });
var drivers = new Datastore({ filename: 'data/drivers.db', autoload: true });

export default async function messageHandler(req, res) {
    const { method } = req;

    switch(method) {
        case 'GET':
            let subsessionData = await subsessions.asyncFind({});
            let allFields = await buildSubsessionData(subsessionData);
            res.status(200).json(allFields);
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} not allowed`);
            break;
    }
}

const buildSubsessionData = async(docs) => {
    let items = [];
    for(let i in docs) {
        let appendFields = {};
        let winnerId = docs[i].winnerid;
        let subsessionId = docs[i].subsessionid;
        let driverData = await drivers.asyncFindOne({ custid: winnerId });
        appendFields.winnerid = driverData.custid;
        appendFields.winnerdisplayname = driverData.displayname;
        appendFields.winnerhelmcolor1 = driverData.helm_color1;
        appendFields.winnerhelmcolor2 = driverData.helm_color2;
        appendFields.winnerhelmcolor3 = driverData.helm_color3;
        appendFields.clubname = driverData.clubname;
        appendFields.subsessionid = subsessionId;
        items.push(appendFields);
    }
    return items;
}