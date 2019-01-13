const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { checkPassword } = require('../helpers/helper.js')
const { OAuth2Client } = require('google-auth-library')

module.exports = {
  checkLogin: function (req, res) {
    let token = req.headers.token

    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      console.log(err,decoded)
      if (err) {
        res.status(401).json({ message: 'please login first' })
      } else {
        User.findOne({ email: decoded.email })
          .then(user => {
            if (user) {
              res.status(200).json({ message: 'logged in' })
            } else {
              res.status(401).json({ message: 'please login first' })
            }
          })
          .catch(error => {
            res.status(500).json({ error, message: "internal server error" })
          })
      }
    })
  },

  login: function (req, res) {
    let { email, password } = req.body
    console.log(req.body)
    User.findOne({ email })
      .then(user => {
        if (user) {
          console.log(user)
          if (checkPassword(password, user.password)) {
            let token = jwt.sign({ email }, process.env.JWT_SECRET)
            res.status(200).json({ token, message: 'success login' })
          } else {
            res.status(400).json({ message: 'Wrong email/password' })
          }
        } else {
          res.status(400).json({ message: 'Wrong email/password' })
        }
      })
      .catch(error => {
        res.status(500).json({ error, message: 'internal server error' })
      })
  },

  loginGoogle: function (req, res) {
    let token = req.body.token
    let email = ''
    let name = ''
    const client = new OAuth2Client(process.env.CLIENT_ID)

    client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID
    })
      .then(ticket => {
        const payload = ticket.getPayload()
        email = payload.email
        name = payload.name
        return User.findOne({ email })
      })
      .then(user => {
        if (user) {
          console.log('user adaa')
          let token = jwt.sign({email: user.email}, process.env.JWT_SECRET)
          res.json({ token, message: "success login" })
        } else {
          console.log('user tidak addd')
          let newUser = {
            name, email, password: process.env.PASSWORD
          }
          return User.create(newUser)
        }
      })
      .then(newuser => {
        console.log(newuser.email)
        let token = jwt.sign({email: newuser.email}, process.env.JWT_SECRET)
        res.status(201).json({ token, message: "success login" })
      })
      .catch(error => {
        res.status(400).json(error)
      })

  },

  register: function (req, res) {
    let newUser = { name, email, password } = req.body
    // User.findOne({ email })
    //   .then(user => {
    //     if (user) {
    //       res.status(400).json({ message: 'email has been registered' })
    //     } else {
    //       return User.create(newUser)
    //     }
    //   })
      User.create(newUser)
      .then(newuser => {
        res.status(201).json({ message: 'success register, please login to continue' })
      })
      .catch(error => {
        let message = ''
        if(error.errors.password){
          message += error.errors.password.message + '\n'
        } 
        if(error.errors.email){
          message += error.errors.email.reason
        }
        
        res.status(400).json({ error, message })
      })
  }

}