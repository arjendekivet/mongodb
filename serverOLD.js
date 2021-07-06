const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const connectionUri = "mongodb://localhost:27017";

app.listen(3001, function () {
  MongoClient.connect(connectionUri, { useUnifiedTopology: true })
    .then((client) => {
      console.log("connected to MongoDB server");
      const db = client.db("myNewDatabase");

      app.get("/events", (req, res) => {
        const eventsCollection = db.collection("events");
        eventsCollection
          .find({})
          .toArray()
          .then((results) => {
            res.send(results);
          })
          .catch(console.error);
      });
    })
    .catch(console.error);
});
