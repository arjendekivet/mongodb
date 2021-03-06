import mongoose from 'mongoose'
const Schema = mongoose.Schema

// create student schema & model
const LayoutDefinitionSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title field is required'],
    },
    label: {
      type: String,
      required: [true, 'Label field is required'],
    },
    type: {
      type: String,
      required: [true, 'Type field is required'],
    },
    layoutKey: {
      type: String,
    },
    config: {
      type: Object,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

LayoutDefinitionSchema.pre('findOneAndUpdate', function () {
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

const LayoutDefinition = mongoose.model(
  'layoutdefinition',
  LayoutDefinitionSchema
)

export default LayoutDefinition
