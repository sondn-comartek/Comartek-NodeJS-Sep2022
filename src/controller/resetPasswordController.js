const express = require('express')
const jwt     = require('jsonwebtoken')
const bcrypt  = require('bcrypt')

const UserModel   = require('../model/user')
const router      = express.Router()


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

module.exports = router