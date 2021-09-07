import { clientConnect, clientClose } from './dbMongo.mjs'

export async function getEvents(username) {
  return await (() =>
    new Promise((resolve, reject) =>
      clientConnect().then((client) => {
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

export async function getEventById(id) {
  return await (() =>
    new Promise((resolve, reject) =>
      clientConnect().then((client) => {
        client
          .db('myNewDatabase')
          .collection('events')
          .find({ id: id })
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
