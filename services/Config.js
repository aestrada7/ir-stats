//constants
export const DATABASE_NEDB = 'NEDB';
export const DATABASE_LOCAL_STORAGE = 'LOCAL_STORAGE';

//configuration (later move to a json)
export const SERVER_URL = `http://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
export const DATA_PROVIDER = DATABASE_NEDB; //or DATABASE_LOCAL_STORAGE