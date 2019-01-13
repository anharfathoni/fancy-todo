const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {encrypt} = require('../helpers/helper.js')

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    validate: {
      validator: function (email) {
        console.log(email)
        return User.find({ email })
          .then(result => {
            if (result.length !== 0) throw "email is used"
          })
          .catch(err => {
            throw (err)
          })
      }
    }
  },
  password: {
    type: String,
    required: [true, 'password must be filled']
  }
})

userSchema.pre('save', function(next){
  this.password = encrypt(this.password)
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User