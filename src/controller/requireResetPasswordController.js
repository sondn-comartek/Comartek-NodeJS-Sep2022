const express = require('express')
const InvalidData = require('../exception/invaiddata')
const router      = express.Router()

const requireResetPassword = require('../service/requireResetPasswordService')

router.post('/password/reset', async (req, res) => {
  try {
    const email = req.query.email

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Invalid email" })
    const isSendingSuccess = await requireResetPassword(email)
    if(!isSendingSuccess) 
    return res.status(401).json({ message: "ResetPassword Email was sending to your email" })
    return res.status(200).json({ message: "ResetPassword Email was sending to your email" })
  } catch (err) {
    console.log(err)
    if(err instanceof InvalidData) 
      return res.status(400).json({message: "Email not existed"})
    return res.status(500).json({ message: "Server Err" })
  }
})

module.exports = router