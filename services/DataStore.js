import * as Config from './Config';

const Datastore = require('nedb');
const MongoClient = require('mongodb').MongoClient;

export const getDataStore = async(collection) => {
    var results = {};
    if(Config.DATA_PROVIDER === Config.DATABASE_NEDB) {
        let dataStoreFile = `./data/${collection}.db`;
        results = new Datastore({ filename: dataStoreFile, autoload: true });
        return results;
    } else if(Config.DATA_PROVIDER === Config.DATABASE_MONGODB) {
        const client = new MongoClient(Config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const database = client.db(Config.MONGO_DATABASE);
        const results = database.collection(collection);
        console.log(results);
        return results;
    }
}