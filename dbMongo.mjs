import { strictEqual } from 'assert'

// mongodb is a CommonJS module.
import moduleMongodb from 'mongodb'
const { MongoClient } = moduleMongodb

const connectionUri = 'mongodb://localhost:27017'

export async function clientConnect() {
  return await (() =>
    new Promise((resolve, reject) =>
      MongoClient.connect(
        connectionUri,
        { useUnifiedTopology: true },
        (err, client) => {
          strictEqual(null, err)
          resolve(client)
        }
      )
    ))()
}
export async function clientClose(client) {
  client.close()
  return true
}
