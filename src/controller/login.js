const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserModel = require('../model/user')

const router = express.Router()
const secretKey = process.env.JWT_KEY


router.post('/login', async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password

    const usersMatchEmail = await UserModel.findAll({
      where: {
        email: email,
      }
    })

    if (usersMatchEmail.length === 0)
      return res.status(401).json({ message: "Email or password not correct" })
    const hashedPassword = usersMatchEmail[0].dataValues.password
    const isMatchPassword = await bcrypt.compare(password, hashedPassword)
    if (!isMatchPassword)
      return res.status(401).json({ message: "Email or password not correct" })

    const token =  jwt.sign({
      data: {
        email: email
      }
    }, secretKey, { expiresIn: 60 * 60 * 24 * 3 });
    
    return res.status(200).json({jwt: token})
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: "Server error" })
  }
})

module.exports = router