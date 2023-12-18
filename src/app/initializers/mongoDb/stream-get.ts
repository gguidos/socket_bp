export default function createStreamGet({ client }) {
  return Object.freeze({ streamGet })
  function streamGet({ query, dbConfig }){
		client collection(this.dbColl).find(query).toStream()
		client.close();
  }
}