const express = require('express')

const InvalidData = require('../exception/invaiddata')
const loginService = require('../service/loginService')


const router = express.Router()


router.post('/login', async (req, res) => {
  try {
    const {email, password} =  req.body
    const token = await loginService(email, password)
    
    return res.status(200).json({jwt: token})
  } catch (err) {
    if(err instanceof InvalidData) 
      return res.status(401).json({ message: "Email or password not correct" })
    return res.status(500).json({ message: "Server error" })
  }
})

module.exports = router