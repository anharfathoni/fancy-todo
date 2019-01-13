const User = require('../models/User')
const Todo = require('../models/Todo')
const Project = require('../models/Project')
const jwt = require('jsonwebtoken')

function isLogin(req,res,next) {
  let token = req.headers.token

  jwt.verify( token, process.env.JWT_SECRET, function(err, decoded){
    if(err) {
      res.status(401).json({message: 'please login first'})
    } else {
      User.findOne({email: decoded.email})
      .then( user => {
        if(user){
          req.current_user = user
          next()
        } else {
          res.status(401).json({message: 'please login first'})
        }
      })
      .catch( error => {
        res.status(500).json({error, message: "internal server error"})
      })
    }
  })
}

function isOwner(req,res,next) {
  console.log('masuk isowner')
  let id = req.params.id
  Todo.findById(id)
  .then( todo => {
    if(todo){
      console.log(todo)
      //untuk cek equality ObjectId bisa pake .toString() atau .equals
      if(todo.userId.equals(req.current_user._id)) {
        console.log('owner')
        next()
      } else {
        res.status(401).json({message: 'this is not your todo'})
      }
    } else {
      res.status(404).json({message: 'todo not found'})
    }
  })
  .catch( error => {
    res.status(500).json({error, message: 'internal server error'})
  }) 
}

function isMember(req, res, next) {
  let userId = req.current_user._id
  let projectId = req.params.projectId
  Project.findById(projectId)
  .then( project => {
    let users = project.members
    let user = users.filter(e => e.toString() === userId.toString());
    if( user.length > 0 ) {
      console.log('member')
      next()
    } else {
      console.log('BUKAN member')
      res.status(401).json({message: 'you are not member'})
    }
  })
  .catch( error => {
    res.status(500).json({error, message: "internal server error"})
  })

}


module.exports = {isLogin, isOwner, isMember}