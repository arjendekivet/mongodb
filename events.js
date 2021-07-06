const { clientConnect, clientClose } = require('./dbMongo');

module.exports = {
  getEvents: async (username) => (await (() => (
    new Promise((resolve, reject) =>(clientConnect().then(client => {
     //Make the query...
      client
       .db('myNewDatabase')
       .collection('events')
       .find({})
      .toArray(
          (err, data) => {       
            clientClose(client);
            resolve(data);
        }
     );
   })
  ))))()),
  
}; 