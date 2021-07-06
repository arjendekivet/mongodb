const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const connectionUri = "mongodb://localhost:27017";

module.exports = {
	
  /* 
   * Mongo Utility: Connect to client */

  clientConnect: async () => (

    client = await (() => (new Promise((resolve, reject) => (

      MongoClient.connect(connectionUri, { useUnifiedTopology: true },
      (err, client) => {
        assert.strictEqual(null, err);
        resolve(client);
      })
    )
  )))()),

  
  /* 
   * Mongo Utility: Close client */

  clientClose: async (client) => {
    client.close();
    return true;
  }
};