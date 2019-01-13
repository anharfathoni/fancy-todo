const Project = require('../models/Project')
const Todo = require('../models/Todo')
const User = require('../models/User')
const mongoose = require('mongoose')

module.exports = {
  create: function (req, res) {
    let { name } = req.body
    let userId = req.current_user._id

    Project.create({ name, userId })
      .then(project1 => {
        return Project.findByIdAndUpdate(project1._id, { $push: { members: userId } }, { new: true })
      })
      .then(project => {
        res.status(201).json({ project, message: 'success create project' })
      })
      .catch(error => {
        res.status(500).json({ error, message: "internal server error" })
      })

  },

  invite: function (req, res, next) {
    console.log('masuk invite')
    let { email } = req.body
    let projectId = req.params.projectId
    User.findOne({ email })
      .then(user => {
        if(user) {
          return Project.findByIdAndUpdate(projectId, {
            $push: { members: user._id }
          }, { new: true })
        } else {
          res.status(400).json({ message: 'the user you invited is not registered' })
        }
      })
      .then(project => {
        res.status(200).json({ project, message: 'success invite' })
      })
      .catch(error => {
        res.status(500).send({ error, message: "internal server error" })
      })

  },

  getProject: function (req, res) {
    let userId = req.current_user._id

    Project.find({ members: mongoose.Types.ObjectId(`${userId}`) })
      .populate('members')
      .populate('todoId')
      .then(projects => {
        res.status(200).json(projects)
      })
      .catch(error => {
        res.status(500).json({ error, message: "internal server error" })
      })
  },

  getDetailsProject: function (req, res) {
    let id = req.params.projectId
    Project.findById(id)
      .populate('todoId')
      .populate('members')
      .then(project => {
        res.status(200).json(project)
      })
      .catch(error => {
        res.status(500).json({ error, message: "internal server error" })
      })

  },

  addTodo: function (req, res) {
    let projectId = req.params.projectId
    let newTodo = { name, description, due_date } = req.body
    // newTodo.userId = req.current_user._id
    console.log(newTodo)

    Todo.create(newTodo)
      .then(todo => {
        console.log(todo)
        return Project.findByIdAndUpdate(projectId, {
          $push: { todoId: todo._id }
        }, { new: true })
      })
      .then(project => {
        res.status(200).json({ project, message: 'success add todo' })
      })
      .catch(error => {
        res.status(500).json({ error, message: "internal server error" })
      })
  },

  editTodo: function (req, res) {
    let projectId = req.params.projectId
    let todoId = req.params.todoId
    let data = { name, description, status, due_date } = req.body
    Todo.findByIdAndUpdate(todoId, data, { new: true })
      .then(todo => {
        return Project.findById(projectId).populate('todoId')
      })
      .then(project => {
        res.status(200).json(project.todoId)
      })
      .catch(error => {
        res.status(500).json({ error, message: "internal server error" })
      })
  },

  deleteTodo: function (req, res) {
    let projectId = req.params.projectId
    let todoId = req.params.todoId
    Project.findByIdAndUpdate(projectId, {
      $pull: { todoId }
    })
      .then(project => {
        return Todo.findByIdAndDelete(todoId)
      })
      .then(todo => {
        res.status(200).json({ message: "success delete todo" })
      })
      .catch(error => {
        res.status(500).json({ error, message: "internal server error" })
      })
  }
}