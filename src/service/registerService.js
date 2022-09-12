const bcrypt = require('bcrypt');
const EmailExisted = require('../exception/emailexisted');

const UserModel = require('../model/user')
module.exports = async (email, password) => {
  const usersMatchEmail = await UserModel.findAll({
    where: {
      email: email,
    }
  })
  if(usersMatchEmail.length != 0) 
    throw new EmailExisted()
  const hashedPassword = await bcrypt.hash(password, 10)
  
  await UserModel.create({
    email: email,
    password: hashedPassword
  })
  return true
}