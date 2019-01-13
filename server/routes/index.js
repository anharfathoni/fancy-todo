var express = require('express');
var router = express.Router();
const controller = require('../controllers/user.js')

router.get('/', function(req, res, next) {
  res.jsonn({ title: 'Home' });
});

router
      .get('/checkLogin', controller.checkLogin)
      .post('/login', controller.login)
      .post('/loginGoogle', controller.loginGoogle)
      .post('/register', controller.register)

module.exports = router;
