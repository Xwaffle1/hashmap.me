import { Db, MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

let cachedDb: Db;
let client: MongoClient;

export const connectToDatabase = async () => {
  
  if (cachedDb) {
    // console.log("Existing cached connection found!");
    return cachedDb;
  }
  console.log("Aquiring new DB connection....");
  try {
    // Connect to our MongoDB database hosted on MongoDB Atlas

    client = await MongoClient.connect(process.env.MONGO_CONNECTION);

    // Specify which database we want to use
    const db = await client.db('mapbase');

    cachedDb = db;
    return db;
  } catch (error) {
    console.log("ERROR aquiring DB Connection!");
    console.log(error);
    throw error;
  }
};

export function getCachedDb() {
  return cachedDb;
}

async function database(req, res, next) {
  if (!client) await connectToDatabase();
  req.dbClient = client;
  req.db = cachedDb;
  return next();
}

const middleware = nextConnect();
middleware.use(database);
export default middleware;