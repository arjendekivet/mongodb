const express = require("express");
const app = express();
const { getEvents } = require('./events');

app.listen(3001, function () {
  console.log('Server started on port 3001');
  app.get("/events", (req, res) => {
    getEvents().then(data => {
      res.send(data);    
    }).catch(e => {
       next(e);
    });
  });
});
