import express from 'express'
const app = express()
import { getEvents, getEventById } from './routeEvents.mjs'

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

  app.get('/event/:id', (req, res) => {
    const intId = parseInt(req.params.id, 10)
    getEventById(intId)
      .then((data) => {
        res.send(data)
      })
      .catch((e) => {
        next(e)
      })
  })

  app.post('/question', (req, res) => {
    const { comment } = req.body
    res.send({ html: marked(comment.trim()) })
  })
})
