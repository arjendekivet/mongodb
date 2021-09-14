import express from 'express'
import Event from '../models/event.mjs'
import Question from '../models/question.mjs'

const router = express.Router()

//
// QUESTION
//

// get a list of questions from the database
router.get('/questions', function (req, res, next) {
  Question.find({})
    .then(function (questions) {
      res.send(questions)
    })
    .catch(next)
})

// get one question by ID from the database
router.get('/questions/:id', function (req, res, next) {
  Question.findOne({ id: req.params.id })
    .then(function (questions) {
      res.send(questions)
    })
    .catch(next)
})

// add a new question to database
router.post('/questions', function (req, res, next) {
  Question.create(req.body)
    .then(function (question) {
      res.send(question)
    })
    .catch(next)
})

// update a question in the database
router.put('/questions/:id', function (req, res, next) {
  Question.findOneAndUpdate({ _id: req.params.id }, req.body).then(function (
    question
  ) {
    Question.findOne({ _id: req.params.id }).then(function (question) {
      res.send(question)
    })
  })
})

// delete a question in the database
router.delete('/questions/:id', function (req, res, next) {
  Question.findOneAndDelete({ _id: req.params.id }).then(function (question) {
    res.send(question)
  })
})

//
// EVENT
//

// get a list of events from the database
router.get('/events', function (req, res, next) {
  Event.find({})
    .then(function (events) {
      res.send(events)
    })
    .catch(next)
})

// get one event by ID from the database
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
