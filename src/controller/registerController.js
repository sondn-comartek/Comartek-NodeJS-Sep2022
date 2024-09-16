const express = require("express")
const registerService = require("../service/registerService");
const EmailExisted = require("../exception/emailexisted");

const router = express.Router()

router.post('/register', async (req, res, next) => {
  try {
  const {email, password} = req.body
  
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

  if(!emailRegex.test(email)) 
    return res.status(400).json({message: "Invalid email"})
  if(!passwordRegex.test(password))
    return res.status(400).json({message: "Invalid password"})
  
  const isRegisterSucess = await registerService(email, password)
  if(!isRegisterSucess) {
    return res.status(400).json({message: 'Creating account faield'})
  }
  return res.status(200).json({message: 'Creating account sucess'})
  } catch(err) {
    if(err instanceof EmailExisted) 
      return res.status(400).json({message: "Email existed"})
    return res.status(500).json({message: "Server Err"})
  } 
})

module.exports = router
