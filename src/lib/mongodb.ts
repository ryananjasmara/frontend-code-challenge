import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || '';
const MONGODB_DB = process.env.MONGODB_DB || '';
const MONGODB_USER = process.env.MONGODB_USER || '';
const MONGODB_PASS = process.env.MONGODB_PASS || '';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (!MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable inside .env.local');
}

if (!MONGODB_USER) {
  throw new Error('Please define the MONGODB_USER environment variable inside .env.local');
}

if (!MONGODB_PASS) {
  throw new Error('Please define the MONGODB_PASS environment variable inside .env.local');
}

declare const global: {
  mongo: { conn: unknown; promise: unknown };
};

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      auth: {
        username: MONGODB_USER,
        password: MONGODB_PASS,
      },
    };

    cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
      return {
        client,
        db: client.db(MONGODB_DB),
      };
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
