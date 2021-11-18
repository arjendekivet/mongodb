import express from 'express'
import mongoose from 'mongoose'
import routes from './routes/api.mjs'

import dbConfig from './config/db.config.js'
import auth from './authentication/routes/auth.routes.js'
import user from './authentication/routes/user.routes.js'
import initial from './authentication/controllers/initial.mjs'

import { authJwt } from './authentication/middlewares/index.js'

// set up our express app
const app = express()

mongoose.Promise = global.Promise

// connect to mongodb
//, {useNewUrlParser: true,useUnifiedTopology: true,}
mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`)
  .then(() => {
    console.log('Successfully connected to MongoDB.')
    initial()
  })
  .catch((err) => {
    console.error('Connection error', err)
    process.exit()
  })

app.use(express.static('public'))

app.use(express.json())

// YverifyToken function
const verifyToken = function (req, res, next) {
  console.log(req.path)
  if (req.path === '/api/auth/signin') {
    next() // Passing the request to the next handler in the stack.
  } else {
    authJwt.verifyToken(req, res, next)
  }
}

app.use(verifyToken) // Here you add your logger to the stack.

// dynamic auth routes
auth(app)
user(app)

// initialize routes
app.use('/api', routes)

// error handling middleware
app.use(function (err, req, res, next) {
  res.status(422).send({ error: err.message })
})

// listen for requests
const PORT = process.env.PORT || 4321
app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}.`)
})
