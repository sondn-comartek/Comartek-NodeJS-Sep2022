const init = require('./src/config/init')
const bootstrap = async () => {
  await init()

  const express = require('express')
  const registerRouter = require('./src/controller/registerController') 
  const loginRouter = require('./src/controller/loginController')
  const passwordRouter = require('./src/controller/passwordController')
  const requireResetPassword = require('./src/controller/requireResetPasswordController')
  const resetPassword = require('./src/controller/resetPasswordController')


  const app = express()
  const port = process.env.port || 3000
  
  app.use(express.urlencoded({extended: true}))
  app.use(express.json())
  app.use(express.static('public'))
  app.use(registerRouter)
  app.use(loginRouter)
  app.use(passwordRouter)
  app.use(requireResetPassword)
  app.use(resetPassword)

  app.listen(port, () => {
    console.log(`Server runing on ${port}`)
  })
}
bootstrap()
.catch(err => {throw err})