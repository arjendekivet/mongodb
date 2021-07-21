import express from 'express'
const app = express()
import { getEvents } from './routeEvents.mjs'

app.listen(4321, function () {
  console.log('Server started on port 4321')
  app.get('/events', (req, res) => {
    getEvents()
      .then((data) => {
        res.send(data)
      })
      .catch((e) => {
        next(e)
      })
  })
})
