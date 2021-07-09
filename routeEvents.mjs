import { clientConnect, clientClose } from './dbMongo.mjs';

export async function getEvents(username) {
  return await (() =>
    new Promise((resolve, reject) =>
      clientConnect().then((client) => {
        //Make the query...
        client
          .db('myNewDatabase')
          .collection('events')
          .find({})
          .toArray((err, data) => {
            clientClose(client);
            resolve(data);
          });
      })
    ))();
}
