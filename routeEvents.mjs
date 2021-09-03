import { clientConnect, clientClose } from './dbMongo.mjs'

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
            if (err) {
              reject(err)
            } else {
              clientClose(client)
              resolve(data)
            }
          })
      })
    ))()
}
