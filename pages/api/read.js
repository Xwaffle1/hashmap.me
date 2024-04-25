import nextConnect from 'next-connect';
import dbClass from '../../util/database';

export const runtime = 'edge';

const handler = nextConnect();
const cors = require('cors')

handler.use(dbClass);
// handler.use(cors)

const corsOptions = {
  origin: true,
  credentials: true
}
handler.options('*', cors(corsOptions)); // preflight OPTIONS;


handler.get(async (req, res) => {
  let db = req.db
  
  console.log(req.body)
  res.setHeader('Access-Control-Allow-Origin', "*")
  res.setHeader('Access-Control-Allow-Methods', "*")
  res.setHeader('Access-Control-Allow-Headers', "*")
  if(req.headers['x-api-key'] == undefined){
    console.log("NO API TOKEN.")
    res.status(400).json({message: "Please provide an x-api-key to access this dataset."})
  }
  var accessToken = req.headers['x-api-key']

  let tokensCollection = await db.collection("hashmapme-tokens")
  var index = await tokensCollection.find({ uuid: accessToken}).toArray()
  console.log(index)
  if(index.length == 0){
    console.error("No collection found with UUID " + accessToken)
    res.status(400).json({message: "ERROR."});

  }
  var collectionName = index[0].collectionName
  var collectionByUUID = await db.collection(collectionName)
  let doc = await collectionByUUID.find().toArray()
  // console.log(doc);
  res.json(doc);
});
export default handler;

