//constants
export const DATABASE_NEDB = 'NEDB';
export const DATABASE_LOCAL_STORAGE = 'LOCAL_STORAGE';
export const DATABASE_MONGODB = 'MONGODB';

//configuration
export const SERVER_URL = `http://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
export const DATA_PROVIDER = DATABASE_NEDB; //or DATABASE_LOCAL_STORAGE or DATABASE_NEDB

//mongo configuration
export const MONGO_URI = `mongodb+srv://${process.env.NEXT_PUBLIC_CLUSTER_USER}:${process.env.NEXT_PUBLIC_CLUSTER_PASSWORD}@${process.env.NEXT_PUBLIC_CLUSTER_URL}/${process.env.NEXT_PUBLIC_DATABASE_NAME}?retryWrites=true&w=majority`;
export const MONGO_DATABASE = process.env.NEXT_PUBLIC_DATABASE_NAME;