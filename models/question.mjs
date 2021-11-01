import mongoose from 'mongoose'
const Schema = mongoose.Schema

// create student schema & model
const QuestionSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title field is required'],
    },
    type: {
      type: String,
    },
    cat_1: {
      type: String,
    },
    cat_2: {
      type: String,
    },
    cat_3: {
      type: String,
    },
    description: {
      type: String,
    },
    answer: {
      type: String,
    },
    due: {
      type: Date,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    updated_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

QuestionSchema.pre('findOneAndUpdate', function () {
  const update = this.getUpdate()
  if (update.__v != null) {
    delete update.__v
  }
  const keys = ['$set', '$setOnInsert']
  for (const key of keys) {
    if (update[key] != null && update[key].__v != null) {
      delete update[key].__v
      if (Object.keys(update[key]).length === 0) {
        delete update[key]
      }
    }
  }
  update.$inc = update.$inc || {}
  update.$inc.__v = 1
})

const Question = mongoose.model('questions', QuestionSchema)

export default Question
