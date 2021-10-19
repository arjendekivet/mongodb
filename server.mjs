import express from 'express'
import mongoose from 'mongoose'
import routes from './routes/api.mjs'

import dbConfig from './app/config/db.config.js'
import auth from './app/routes/auth.routes.js'
import user from './app/routes/user.routes.js'
import initial from './app/controllers/initial.mjs'

// set up our express app
const app = express()

// connect to mongodb
// mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`)
mongoose.Promise = global.Promise

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
