const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserModel = require('../model/user')
const InvalidData = require('../exception/invaiddata')




module.exports = async (email, password) => {
  const secretKey = process.env.JWT_KEY
  const usersMatchEmail = await UserModel.findAll({
    where: {
      email: email,
    }
  }).
  then(raw => raw[0]?.dataValues)
  if (!usersMatchEmail)
    throw new InvalidData()
  const hashedPassword = usersMatchEmail.password
  const isMatchPassword = await bcrypt.compare(password, hashedPassword)
  if (!isMatchPassword)
    throw new InvalidData()

  const token =  jwt.sign({
    data: {
      email: email
    }
  }, secretKey, { expiresIn: 60 * 60 * 24 * 3 });
  return token
}