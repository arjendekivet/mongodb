import express from 'express'
const app = express()
app.use(express.json())
import { getEvents, getEventById, postQuestion } from './routeEvents.mjs'

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
    postQuestion(req.body)
      .then((data) => {
        res.send({ succes: true, data: data })
      })
      .catch((e) => {
        next(e)
      })
  })
})
