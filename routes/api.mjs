import express from 'express'
import _ from 'lodash'
import LayoutDefinition from '../models/layoutDefinition.mjs'
import Question from '../models/question.mjs'
import Answer from '../models/answer.mjs'

const router = express.Router()

const modelMapper = { questions: Question, layoutdefinition: LayoutDefinition }

router.get('/schema/:model', function (req, res, next) {
  const model = req.params.model
  if (!modelMapper[model]) {
    res.status(500).send({ message: `Model: ${model} not found ...` })
  }

  const paths = modelMapper[model].schema.paths
  const modelProps = _.mapValues(paths, (o) =>
    _.pick(o, ['isRequired', 'instance'])
  )

  res.send(modelProps)
})

//
// QUESTION
//

// get a list of questions from the database
router.get('/questions', function (req, res, next) {
  let authFilter = {}
  const isAdmin = _.indexOf(req.userRoles, 'admin') > -1
  if (!isAdmin) {
    authFilter = { created_by: req.userId }
  }

  Question.find(authFilter, null, {
    sort: { title: 1 },
    collation: { locale: 'en' },
  })
    .then(function (questions) {
      res.send(questions)
    })
    .catch(next)
})

// get one question by ID from the database
router.get('/questions/:id', function (req, res, next) {
  let authFilter = {}
  const isAdmin = _.indexOf(req.userRoles, 'admin') > -1
  if (!isAdmin) {
    authFilter = { created_by: req.userId }
  }

  const baseFilter = { _id: req.params.id }
  const filter = { ...baseFilter, ...authFilter }

  Question.findOne(filter)
    .then(function (questions) {
      if (!questions) {
        res.status(500).send({ message: 'Question not found ...' })
      } else {
        res.send(questions)
      }
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

// get questions by FILTER Type from the database
router.get('/questions/filter/:filterType/:filter', function (req, res, next) {
  const query = {}
  Question.find({ [req.params.filterType]: req.params.filter }, null, {
    sort: { title: 1 },
    collation: { locale: 'en' },
  })
    .then(function (questions) {
      res.send(questions)
    })
    .catch(next)
})

router.post('/questions/filter', function (req, res, next) {
  let authFilter = {}
  const isAdmin = _.indexOf(req.userRoles, 'admin') > -1
  if (!isAdmin) {
    authFilter = { created_by: req.userId }
  }

  const filter = {...req.body, ...authFilter}
  Question.find(filter, null, {
    sort: { title: 1 },
    collation: { locale: 'en' },
  })
    .then(function (questions) {
      res.send(questions)
    })
    .catch(next)
})

router.get('/questions/distinct/:field', function (req, res, next) {
  Question.find().distinct(req.params.field)
    .then(function (categories) {
      res.send(_.compact(categories))
    })
    .catch(next)
})

// add a new question to database
router.post('/questions', function (req, res, next) {
  const userId = req.userId
  req.body.created_by = userId
  Question.create(req.body)
    .then(function (question) {
      Question.populate(question, {
        path: 'created_by',
        select: 'username',
      }).then(function (question) {
        res.send(question)
      })
    })
    .catch(next)
})

// update a question in the database
router.put('/questions/:id', function (req, res, next) {
  const userId = req.userId
  req.body.updated_by = userId
  Question.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(function (question) {
      Question.findOne({ _id: req.params.id }).then(function (question) {
        question.updated_by.push(req.userId)
        question.save().then((question) => {
          Question.populate(question, {
            path: 'updated_by',
            select: 'username',
          }).then(function (question) {
            res.send(question)
          })
        })
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

// add a new answer to database
router.post('/answer', function (req, res, next) {
  const userId = req.userId
  req.body.created_by = userId
  Answer.create(req.body)
  .then(function (response) {
    res.send(response)
  })
    .catch(next)
})

// get answers by FILTER Type from the database
router.get('/answer/filter/:filterType/:filter', function (req, res, next) {
  const query = {}
  Answer.find({ [req.params.filterType]: req.params.filter }, null, {
    sort: { title: 1 },
    collation: { locale: 'en' },
  })
    .then(function (response) {
      res.send(response)
    })
    .catch(next)
})

router.get('/answer/distinct/:field', function (req, res, next) {
  Answer.find().distinct(req.params.field)
    .then(function (categories) {
      res.send(_.compact(categories))
    })
    .catch(next)
})

router.post('/answer/filter', function (req, res, next) {
  let authFilter = {}
  const isAdmin = _.indexOf(req.userRoles, 'admin') > -1
  if (!isAdmin) {
    authFilter = { created_by: req.userId }
  }

  const filter = {...req.body, ...authFilter}
  Answer.find(filter, null, {
    sort: { title: 1 },
    collation: { locale: 'en' },
  })
    .then(function (questions) {
      res.send(questions)
    })
    .catch(next)
})

export default router
