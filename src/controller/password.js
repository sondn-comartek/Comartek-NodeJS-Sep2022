const express = require('express')
const jwt = require('jsonwebtoken')
const path = require('path');
const bcrypt = require('bcrypt')

const UserModel = require('../model/user')
const EmailSender = require('../config/emailSender')
const router = express.Router()


router.post('/password/reset', async (req, res) => {
  try {
    const email = req.query.email

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Invalid email" })

    const usersMatchEmail = await UserModel.findAll({
      where: {
        email: email,
      }
    })
    if (usersMatchEmail.length === 0)
      return res.status(401).json({ message: "Email not exist" })
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
    return res.status(200).json({ message: "ResetPassword Email was sending to your email" })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Server Err" })
  }
})
router.put('/password/reset', async (req, res, next) => {
  try {
    const token = req.body.token
    const password = req.body.password
    const secretKey = process.env.JWT_KEY

    const decode = jwt.verify(token, secretKey)
    if (Date.now() >= decode.exp * 1000) {
      return res.status(401).send("<H1>JWT Expired</H1>")
    }

    const email = decode.data.email
    const usersMatchEmail = await UserModel.findAll({
      where: {
        email: email,
      }
    })

    const userUpdatedAt = new Date(usersMatchEmail[0].dataValues.updatedAt)
    const userID = usersMatchEmail[0].dataValues.id
    const requestDate = new Date(decode.data.requestDate)

    if (requestDate < userUpdatedAt)
      return res.status(401).send("<H1>JWT Expired</H1>")
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (!passwordRegex.test(password))
      return res.status(400).json({ message: "Invalid password" })
    const hashedPassword = await bcrypt.hash(password, 10)
    await UserModel.update({ password: hashedPassword },
      {
        where: { id: userID },
      })
    return res.status(200).json({message: "update password sucess"})
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Server Err" })
  }



})
router.get('/password/reset/:resetToken', async (req, res, next) => {
  try {
    const token = req.params.resetToken
    const secretKey = process.env.JWT_KEY
    
    const decode = jwt.verify(token, secretKey)

    if (Date.now() >= decode.exp * 1000)
      return res.status(401).body("<H1>JWT Expired</H1>")

    const email = decode.data.email
    const usersMatchEmail = await UserModel.findAll({
      where: {
        email: email,
      }
    })
    const userUpdatedAt = new Date(usersMatchEmail[0].dataValues.updatedAt)
    const requestDate = new Date(decode.data.requestDate)
    if (requestDate < userUpdatedAt)
      return res.status(401).send("<H1>JWT Expired</H1>")
    return res.sendFile(path.join(__dirname, '../../public/ResetPassword.html'));
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "ERR" })
  }
})
module.exports = router