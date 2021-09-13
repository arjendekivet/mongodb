import mongoose from 'mongoose'
const Schema = mongoose.Schema

// create student schema & model
const EventSchema = new Schema({
  title: {
    type: String,
  },
  category: {
    type: String,
  },
  id: {
    type: Number,
  },
})

const Event = mongoose.model('event', EventSchema)

export default Event
