const express = require("express")
const bcrypt = require('bcrypt');

const UserModel = require('../model/user')

const router = express.Router()

router.post('/register', async (req, res, next) => {
  try {
  console.log(req.body)
  const email = req.body.email
  const password = req.body.password
  
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

  if(!emailRegex.test(email)) 
    return res.status(400).json({message: "Invalid email"})
  if(!passwordRegex.test(password))
    return res.status(400).json({message: "Invalid password"})
  
  const usersMatchEmail = await UserModel.findAll({
    where: {
      email: email,
    }
  })
  if(usersMatchEmail.length != 0) 
    return res.status(400).json({message: "Email existed"})
  const hashedPassword = await bcrypt.hash(password, 10)
  
  await UserModel.create({
    email: email,
    password: hashedPassword
  })

  return res.status(200).json({message: 'Creating account sucess'})
  } catch(err) {
    console.log(err)
    return res.status(500).json({message: "Server Err"})
  } 
})

module.exports = router
