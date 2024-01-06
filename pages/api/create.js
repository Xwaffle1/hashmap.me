import nextConnect from 'next-connect';
import dbClass from '../../util/database';
import uuid from 'uuid-random';
import { validate } from 'uuid';


const handler = nextConnect();
handler.use(dbClass);

handler.post(async (req, res) => {
  let db = req.db
  console.log(req.body)
  console.log("CREATE?")
  // var json = JSON.parse()

  var collectionExists = await db.listCollections({ name: req.body.hashmapName.toLowerCase()}).hasNext()

  const fakeUuid = formatAsUUID(req.body.hashmapName.toLowerCase());
  console.log(fakeUuid);
  const isUUID = validate(fakeUuid);
  console.log("isUUID: " + isUUID);
  if (isUUID) {
    console.error("UUID USED TO CRREATE.");
    res.status(400).json({"message": "HASHMAP ALREADY IN USE."})
    return
  }

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

function formatAsUUID(uuidString) {
  return uuidString.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');
}

function isUUID ( uuid ) {
  let s = "" + uuid;

  s = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
  if (s === null) {
    return false;
  }
  return true;
}


export default handler;

