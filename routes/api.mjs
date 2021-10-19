import express from 'express'
import LayoutDefinition from '../models/layoutDefinition.mjs'
import Question from '../models/question.mjs'

import verifySignUp from '../app/middlewares/verifySignUp.js'
import controller from '../app/controllers/auth.controller.js'

const router = express.Router()

//
// AUTHENICATION
//

// router.get('/auth/signup', function (req, res, next) {
//   res.send('pipo')
// })

//[verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
// router.post('/auth/signup', function (req, res, next) {
//   res.send('pipo')
//   // controller.signup(req, res)
// })

// router.post('/auth/signin', controller.signin)

//
// QUESTION
//

// get a list of questions from the database
router.get('/questions', function (req, res, next) {
  Question.find({}, null, { sort: { title: 1 }, collation: { locale: 'en' } })
    .then(function (questions) {
      res.send(questions)
    })
    .catch(next)
})

// get one question by ID from the database
router.get('/questions/:id', function (req, res, next) {
  Question.findById(req.params.id)
    .then(function (questions) {
      res.send(questions)
    })
    .catch(next)
})

// get questions by FILTER from the database
router.get('/questions/filter/:filter', function (req, res, next) {
  Question.find({ title: { $regex: '.*' + req.params.filter + '.*' } }, null, {
    sort: { title: 1 },
    collation: { locale: 'en' },
  })
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
  Question.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(function (question) {
      Question.findOne({ _id: req.params.id }).then(function (question) {
        res.send(question)
      })
    })
    .catch(next)
})

// delete a question in the database
router.delete('/question/:id', function (req, res, next) {
  Question.findOneAndDelete({ _id: req.params.id })
    .then(function (question) {
      res.send(question)
    })
    .catch(next)
})

router.delete('/questions/:ids', function (req, res, next) {
  const ids = req.params.ids.split(',')
  Question.deleteMany({
    _id: {
      $in: ids,
    },
  })
    .then(function (question) {
      res.send(question)
    })
    .catch(next)
})

//
// LayoutDefinition
//

// get a list of questions from the database
router.get('/layoutdefinition', function (req, res, next) {
  LayoutDefinition.find({}, null, {
    sort: { title: 1 },
    collation: { locale: 'en' },
  })
    .then(function (result) {
      res.send(result)
    })
    .catch(next)
})

// get one question by ID from the database
router.get('/layoutdefinition/:id', function (req, res, next) {
  LayoutDefinition.findById(req.params.id)
    .then(function (result) {
      res.send(result)
    })
    .catch(next)
})

// get by FILTER from the database
router.get('/layoutdefinition/filter/:filter', function (req, res, next) {
  LayoutDefinition.find(
    { title: { $regex: '.*' + req.params.filter + '.*' } },
    null,
    { sort: { title: 1 }, collation: { locale: 'en' } }
  )
    .then(function (result) {
      res.send(result)
    })
    .catch(next)
})

// add a new document to database
router.post('/layoutdefinition', function (req, res, next) {
  LayoutDefinition.create(req.body)
    .then(function (result) {
      res.send(result)
    })
    .catch(next)
})

// update a document in the database
router.put('/layoutdefinition/:id', function (req, res, next) {
  LayoutDefinition.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(function () {
      LayoutDefinition.findOne({ _id: req.params.id }).then(function (result) {
        res.send(result)
      })
    })
    .catch(next)
})

router.delete('/layoutdefinition/:ids', function (req, res, next) {
  const ids = req.params.ids.split(',')
  LayoutDefinition.deleteMany({
    _id: {
      $in: ids,
    },
  })
    .then(function (result) {
      res.send(result)
    })
    .catch(next)
})

export default router
