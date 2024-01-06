import { MongoClient } from 'mongodb';
import { getCachedDb, connectToDatabase } from '../util/database';
import { time } from 'console';
// load .env file
require('dotenv').config();



async function init() {
    const db = await connectToDatabase(); ;
    
    console.log("Connected.")
    const collection = await db.collection("hashmapme-tokens")
    // list all documents in collection, sort by _id: -1
    const documents = await collection.find({}).sort({_id:-1}).toArray()
    let countedCollections = 0;
    for (let i = 0; i < documents.length; i++) {
        const document = documents[i];
        // convert _id to timestamp
        const timestamp = document._id.getTimestamp();
        // console.log(timestamp + " " + document.collectionName);
        if (timestamp < new Date("2024-01-01")) {
            // get collection, check if it's empty
            const collection = await db.collection(document.collectionName);
            const count = await collection.countDocuments();
            if (count === 0) {
                console.log("Deleting collection " + document.collectionName + " == " + timestamp);
                countedCollections++;
                try {
                    await collection.drop();
                } catch (error) {
                    console.log("Error deleting collection " + document.collectionName + " == " + timestamp);
                }
            } else {
                console.log("Keeping collection " + document.collectionName + " == " + timestamp + " with " + count + " documents");
            }
        }
    }
    console.log("Deleted " + countedCollections + " collections.")
}

init().then(() => {
    process.exit(0);
}).catch((error) => {
    console.log(error);
})