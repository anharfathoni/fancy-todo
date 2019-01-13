const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const projectSchema  = new Schema({
  name: {
    type: String,
    required: [true, "project name must be filled"]
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  todoId: [{
    type: Schema.Types.ObjectId,
    ref: 'Todo'
  }],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project