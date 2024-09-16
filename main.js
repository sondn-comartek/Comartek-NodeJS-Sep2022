const init = require('./src/config/init')
const socketioChatController = require('./src/controller/socketioChatController')
const bootstrap = async () => {
  await init()

  const express = require('express')
  const registerRouter = require('./src/controller/registerController') 
  const loginRouter = require('./src/controller/loginController')
  const passwordRouter = require('./src/controller/resetPasswordUIController')
  const requireResetPassword = require('./src/controller/requireResetPasswordController')
  const resetPassword = require('./src/controller/resetPasswordController')
  const socketioauth = require('./src/auth/socketioauth')
  const socketioCon     = require('./src/controller/socketioChatController')

  const app = express()
  const http = require('http')
  const server = http.createServer(app)
  const {Server} = require("socket.io")
  const io = new Server(server);
  const port = process.env.port || 3000
  


  app.use(express.urlencoded({extended: true}))
  app.use(express.json())
  app.use(express.static('public'))
  app.use(registerRouter)
  app.use(loginRouter)
  app.use(passwordRouter)
  app.use(requireResetPassword)
  app.use(resetPassword)

  

  io.use(socketioauth);
  
  io.on('connection', socketioChatController )
  
  server.listen(port, () => {
    console.log(`Server runing on ${port}`)
  })
}
bootstrap()
.catch(err => {throw err})