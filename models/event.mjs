import mongoose from 'mongoose'
const Schema = mongoose.Schema

// create event schema & model
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
  date: {
    type: Date,
  },
})

const Event = mongoose.model('events', EventSchema)

export default Event
