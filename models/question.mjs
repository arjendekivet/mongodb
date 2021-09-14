import mongoose from 'mongoose'
const Schema = mongoose.Schema

// create student schema & model
const QuestionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title field is required'],
  },
  type: {
    type: String,
  },
  description: {
    type: String,
  },
})

const Question = mongoose.model('questions', QuestionSchema)

export default Question
