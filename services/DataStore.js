import * as Config from './Config';
import { collection, getDoc, setDoc, doc } from 'firebase/firestore';
import { database } from '../firebaseConfig';

const Datastore = require('nedb');

export const getDataStore = async(collectionName) => {
    if(Config.DATA_PROVIDER === Config.DATABASE_NEDB) {
        let dataStoreFile = `./data/${collectionName}.db`;
        const store = new Datastore({ filename: dataStoreFile, autoload: true });
        return store;
    } else if(Config.DATA_PROVIDER === Config.DATABASE_FIRESTORE) {
        const store = collection(database, collectionName);
        return store;
    }
}