const express = require('express')
const jwt     = require('jsonwebtoken')
const path    = require('path');

const UserModel   = require('../model/user')
const router      = express.Router()




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