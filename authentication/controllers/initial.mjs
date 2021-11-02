import bcrypt from 'bcryptjs'
import db from '../models/index.js'

const Role = db.role
const User = db.user

function createAdmin(role) {
  new User({
    username: 'admin',
    email: 'no email',
    password: bcrypt.hashSync('admin', 8),
    roles: [role],
  }).save((err) => {
    if (err) {
      console.log('error', err)
    }
    console.log("added 'admin' to users collection, with password=admin")
  })
}

const initial = function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      console.log('Create new user and roles ....')
      new Role({
        name: 'user',
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }
        console.log("added 'user' to roles collection")
      })

      new Role({
        name: 'moderator',
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }
        console.log("added 'moderator' to roles collection")
      })

      new Role({
        name: 'admin',
      })
        .save()
        .then(function (role) {
          console.log("added 'admin' to roles collection")
          createAdmin(role)
        })
        .catch(function (err) {
          console.log('error', err)
        })
    }
  })
}

export default initial