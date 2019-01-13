const express = require('express')
const router = express.Router()
const controller = require('../controllers/todo.js')
const {isLogin, isOwner} = require('../middlewares/middleware')

router.use(isLogin)
router
      .get('/', controller.getAllTodo)
      .post('/', controller.create)

router
      .get('/:id', controller.getOneTodo)
      .put('/:id', isOwner, controller.edit)
      .delete('/:id', isOwner, controller.delete)

module.exports = router