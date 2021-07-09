import express from 'express'
const app = express()
import { getEvents } from './routeEvents.mjs'

app.listen(3001, function () {
  console.log('Server started on port 3001')
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
