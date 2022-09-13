
const jwt     = require('jsonwebtoken')

const UserModel   = require('../model/user')
const EmailSender = require('../config/emailSender')
const InvalidData = require('../exception/invaiddata')


module.exports = async (email) => {
  const usersMatchEmail = await UserModel.find({
      email: email,
  })
  if (usersMatchEmail.length === 0)
    throw new InvalidData()
  const secretKey = process.env.JWT_KEY
  const resetPasswordToken = jwt.sign({
    data: {
      email: email,
      status: 'pending',
      requestDate: new Date()
    }
  }, secretKey, { expiresIn: 60 * 60 * 24 * 3 });


  const host = process.env.SERVER_HOST

  const resetPasswordLink = `${host}/password/reset/${resetPasswordToken}`

  const bodyMail = `
<h1>Reset password mail request from lecture10app</h1>
<p>If you want reset password click the link bellow, if not, the link will expire in 3 days</p>
<p>Click <a href="${resetPasswordLink}">here</a> to reset your password</p>
`
  await EmailSender({
    to: email,
    subject: "Lecture 10 reset password",
    html: bodyMail
  })
  
  return true
}