import express from 'express'
import mongoose from 'mongoose'
import routes from './routes/api.mjs'

// set up our express app
const app = express()

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/myNewDatabase')
mongoose.Promise = global.Promise

app.use(express.static('public'))

app.use(express.json())
// initialize routes
app.use('/api', routes)

// error handling middleware
app.use(function (err, req, res, next) {
  //console.log(err);
  res.status(422).send({ error: err.message })
})

// listen for requests
app.listen(process.env.port || 4321, function () {
  console.log('Ready to Go on port 4321 ...')
})
