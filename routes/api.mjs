import express from 'express'
import Event from '../models/event.mjs'

const router = express.Router()

// get a list of events from the database
router.get('/events', function (req, res, next) {
  Event.find({})
    .then(function (events) {
      res.send(events)
    })
    .catch(next)
})

router.get('/events/:id', function (req, res, next) {
  Event.findOne({ id: req.params.id })
    .then(function (events) {
      res.send(events)
    })
    .catch(next)
})

// add a new event to database
router.post('/events', function (req, res, next) {
  Event.create(req.body)
    .then(function (event) {
      res.send(event)
    })
    .catch(next)
})

// update a event in the database
router.put('/events/:id', function (req, res, next) {
  Event.findOneAndUpdate({ _id: req.params.id }, req.body).then(function (
    event
  ) {
    Event.findOne({ _id: req.params.id }).then(function (event) {
      res.send(event)
    })
  })
})

// delete a event in the database
router.delete('/events/:id', function (req, res, next) {
  Event.findOneAndDelete({ _id: req.params.id }).then(function (event) {
    res.send(event)
  })
})

export default router
