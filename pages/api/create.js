import nextConnect from 'next-connect';
import dbClass from '../../util/database';
import uuid from 'uuid-random';


const handler = nextConnect();
handler.use(dbClass);

handler.post(async (req, res) => {
  let db = req.db
  console.log(req.body)
  console.log("CREATE?")
  // var json = JSON.parse()

  var collectionExists = await db.listCollections({ name: req.body.hashmapName.toLowerCase()}).hasNext()
  console.log("Collection exists : " + collectionExists)
  if (collectionExists){
    res.status(400).json({"message": "HASHMAP ALREADY IN USE."})
    return
  }  
  console.log("MAKING COLLECTION?")

  let collection = await db.createCollection(req.body.hashmapName.toLowerCase())
  console.log(collection);

  var tokenUuid = req.body.hashmapName.toLowerCase() + "-" + uuid()

  let tokensCollection = db.collection('hashmapme-tokens')
  let doc = await tokensCollection.insert({uuid: tokenUuid, collectionName: req.body.hashmapName.toLowerCase()});

  res.json({token: tokenUuid});
});

export default handler;

