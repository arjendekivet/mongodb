import mongoose from 'mongoose'
const Schema = mongoose.Schema

// create student schema & model
const FormDefinitionSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title field is required'],
    },
    formDefinition: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

FormDefinitionSchema.pre('findOneAndUpdate', function () {
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

const FormDefinition = mongoose.model('formdefinition', FormDefinitionSchema)

export default FormDefinition
