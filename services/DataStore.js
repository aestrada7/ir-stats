import * as Config from './Config';

const Datastore = require('nedb');

export const getDataStore = async(collectionName) => {
    if(Config.DATA_PROVIDER === Config.DATABASE_NEDB) {
        let dataStoreFile = `./data/${collectionName}.db`;
        const store = new Datastore({ filename: dataStoreFile, autoload: true });
        return store;
    }
}