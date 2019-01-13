const express = require('express')
const router = express.Router()
const controller = require('../controllers/project')
const {isLogin, isMember} = require('../middlewares/middleware')

router.use(isLogin)
router
      .get('/', controller.getProject)
      .get('/:projectId', isMember, controller.getDetailsProject)
      .post('/', controller.create)
      .post('/:projectId', isMember, controller.addTodo)
      .post('/:projectId/invite', isMember, controller.invite)
      .put('/:projectId/:todoId', isMember, controller.editTodo)
      .delete('/:projectId/:todoId', isMember, controller.deleteTodo)

module.exports = router