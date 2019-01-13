const mongoose = require('mongoose')
const Schema =  mongoose.Schema

const todoSchema = new Schema({
  name: String,
  description: String,
  status: {
    type: String,
    default: 'uncompleted'
  },
  due_date: Date,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo