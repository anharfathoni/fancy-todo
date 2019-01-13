const Todo = require('../models/Todo')

module.exports = {
  create: function(req,res) {
    let newTodo = {name, description, status, due_date} = req.body
    newTodo.userId = req.current_user._id

    Todo.create(newTodo)
    .then( todo => {
      res.status(201).json({todo, message: 'Success create todo'})
    })
    .catch( error => {
      res.status(500).json({error, message: 'internal server error'})
    })
  },

  getAllTodo: function(req,res){
    let userId = req.current_user._id
    Todo.find({userId})
    .then( todos => {
      res.status(200).json(todos)
    })
    .catch( error => {
      res.status(500).json({error, message: 'internal server error'})
    })
  },

  getCompletedTodos: function(req,res) {

  },

  getOneTodo: function(req,res){
    let id = req.params.id
    Todo.findById(id)
    .then( todo => {
      res.status(200).json(todo)
    })
    .catch( error => {
      res.status(500).json({error, message: 'internal server error'})
    })
  },

  edit: function(req,res) {
    let id = req.params.id
    console.log(id)
    let data = {name, description, status, due_date} = req.body
    Todo.findByIdAndUpdate(id, data, {new: true})
    .then( todo => {
      res.status(200).json({todo, message: 'Success edit todo'})
    })
    .catch( error => {
      res.status(500).json({error, message: 'internal server error'})
    })
  },

  delete: function(req,res){
    let id = req.params.id
    Todo.findByIdAndDelete(id)
    .then( data => {
      res.status(201).json({message: 'Success delete todo'})
    })
    .catch( error => {
      res.status(500).json({error, message: 'internal server error'})
    })
  }
}