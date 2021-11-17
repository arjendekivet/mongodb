import mongoose from 'mongoose'
const Schema = mongoose.Schema

// create student schema & model
const CurrentSchema = new Schema(
  {
    question_id: {
        type: Schema.Types.ObjectId,
        ref: 'Questions',
    },
    answer: {
      type: String,
    },
    correct: {
      type: Boolean,
    },
    percentage: {
      type: String,
    },
    manual: {
      type: Boolean,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: { createdAt: 'created_at' },
  }
)

const ExportSchema = mongoose.model('answer', CurrentSchema)

export default ExportSchema
