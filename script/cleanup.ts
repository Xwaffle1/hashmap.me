import { MongoClient } from 'mongodb';
// load .env file
require('dotenv').config();

function init() {
    const client: MongoClient = new MongoClient(process.env.MONGO_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    client.connect().then(async (mongo) => {
        console.log("Connected.")
        const collection = await mongo.db("mapbase").collection("hashmapme-tokens")
        // list all documents in collection, sort by _id: -1
        const documents = await collection.find({}).sort({_id:-1}).toArray()
        for (let i = 0; i < documents.length; i++) {
            const document = documents[i];
            if (document.collectionName.length === 32) {
                // Delete collection named document.collectionName
                console.log("Deleting collection " + document.collectionName);
                await mongo.db("mapbase").collection(document.collectionName).drop();
            }
        }
    });
}

init();