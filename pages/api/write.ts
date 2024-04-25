import nextConnect from 'next-connect';
import dbClass from '../../util/database';
import { Db } from 'mongodb';


export const runtime = 'experimental-edge';

const cors = require('cors')

const handler = nextConnect();
handler.use(dbClass);
// handler.use(cors)

const corsOptions = {
  origin: true,
  credentials: true
}
handler.options('*', cors(corsOptions)); // preflight OPTIONS;


handler.put(async (req, res) => {
  //@ts-ignore
  let db : Db = req.db
  //@ts-ignore
  console.log(req.body)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')

  if(req.headers['x-api-key'] == undefined){
    // console.log("NO API TOKEN.")
    //@ts-ignore
    res.status(400).json({message: "Please provide an x-api-key to access this dataset."})
    return
  }
  var accessToken = req.headers['x-api-key']

  // Ensure request is is json application content type
  if (req.method === 'PUT' && req.headers['content-type'] != "application/json"){
    // console.log("NOT JSON.")
    //@ts-ignore
    res.status(400).json({message: "Error. Please provide a JSON body, with the Content-Type header set to application/json."})
    return
  }
//@ts-ignore
  if (req.body.key == undefined && req.body.KEY == ""){
    // console.log("NO KEY.")
    //@ts-ignore
    res.status(400).json({message: "Error. Please provide a KEY in your JSON request body for the hashmap record you are attempting to put."})
    return
  }
//@ts-ignore
  if (req.body.value == undefined && req.body.VALUE == undefined){
    // console.log("NO VALUE.")
    //@ts-ignore
    res.status(400).json({message: "Error. Please provide a VALUE in your JSON request body for the hashmap record you are attempting to put."})
    return
  }
//@ts-ignore
  const key = req.body.key ?? req.body.KEY
  //@ts-ignore
  const value = req.body.value ?? req.body.VALUE
  
  let tokensCollection = await db.collection("hashmapme-tokens")
  var index = await tokensCollection.find({ uuid: accessToken}).toArray()
  
  if(index.length == 0){
    console.error("No collection found with UUID " + accessToken)
    //@ts-ignore
    res.status(400).json({message: "Error. No collection found with your accessToken. Please check your token, and try again."});
    return
  }



  var collectionName = index[0].collectionName
  var collectionByUUID = await db.collection(collectionName)

  // get the collections stats to check size
  const collectionStats = await db.command({ collStats: collectionName });
  console.log("CollectionSize: " + collectionStats.size);
  console.log("collectionName: " + collectionName)

  if (collectionStats.size >= 1000 * 1000 * 1000){
      console.log("DATA TOO LARGE")
      //@ts-ignore
      res.status(400).json({message: "Error. Large collection. Hey cutie, I wasn't expecting us to move this fast. Your collection is greater than 1GB..."})
  }


  // console.log("FOUND COLLECTION...")
  var currentIndexWithKey = await collectionByUUID.find({ key: key}).toArray()
  // console.log(currentIndexWithKey)

  if (currentIndexWithKey.length == 0){
    // console.log("Inserted into Database..");
    let doc = await collectionByUUID.insertOne({key: key, value: value}); 
    //@ts-ignore       
    res.status(200).json(doc);
  }else{
    // console.log("UPDATING Database..");
    let doc = await collectionByUUID.updateOne({ key: key}, {$set: {value: value}});        
    //@ts-ignore
    res.status(200).json(doc);
  }
  
}, cors());

export default handler;

