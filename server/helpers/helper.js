const bcrypt = require('bcryptjs')

function encrypt(password) {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

function checkPassword(input, hash) {
  return bcrypt.compareSync(input, hash)
}

module.exports = {
  encrypt, checkPassword
}