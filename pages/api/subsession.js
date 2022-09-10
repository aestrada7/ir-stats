import { getDriver, getSubsessions } from '../../middleware/nedb';

export default async function messageHandler(req, res) {
    const { method } = req;
    const year = req.query.year;
    const season = req.query.season;
    const week = req.query.week;

    let searchObj = {};
    if(year) {
        searchObj.season_year = parseInt(year);
    }
    if(season) {
        searchObj.season_quarter = parseInt(season);
    }
    if(week) {
        searchObj.race_week_num = parseInt(week);
    }

    switch(method) {
        case 'GET':
            let subsessionData = await getSubsessions(searchObj);
            let allFields = await buildSubsessionData(subsessionData);
            res.status(200).json(allFields);
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

const buildSubsessionData = async(docs) => {
    let items = [];
    for(let i in docs) {
        let appendFields = {};
        let winnerId = docs[i].winnerid;
        let subsessionId = docs[i].subsessionid;
        let driverData = await getDriver(winnerId);
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