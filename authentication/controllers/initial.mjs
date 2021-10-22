import bcrypt from 'bcryptjs'
import db from '../models/index.js'

const Role = db.role
const User = db.user

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
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }
        console.log("added 'admin' to roles collection")
      })

      let roles
      Role.find(
        { name: { $in: ['admin', 'moderator', 'user'] } },
        (err, roles) => {
          if (err) {
            console.log(error)
            return
          }
          roles = roles.map((role) => role._id)
          new User({
            username: 'admin',
            email: 'no email',
            password: bcrypt.hashSync('admin', 8),
            roles: roles,
          }).save((err) => {
            if (err) {
              console.log('error', err)
            }
            console.log(
              "added 'admin' to users collection, with password=admin"
            )
          })
        }
      )
    }
  })
}

export default initial
