export default function createConnection({ MongoClient }) {
  return Object.freeze({ connection })
  function connection({
    dbName,
    dbUri,
    dbColl
  }){
    const connection = await MongoClient.connect(this.dbUri);
		
    return connection.db();
  }
}