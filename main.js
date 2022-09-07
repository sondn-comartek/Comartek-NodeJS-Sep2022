const init = require('./src/config/init')
const bootstrap = async () => {
  await init()

  const express = require('express')
  const registerRouter = require('./src/controller/register') 
  const loginRouter = require('./src/controller/login')
  const passwordRouter = require('./src/controller/password')

  const app = express()
  const port = process.env.port || 3000
  
  app.use(express.urlencoded({extended: true}))
  app.use(express.json())
  app.use(express.static('public'))
  app.use(registerRouter)
  app.use(loginRouter)
  app.use(passwordRouter)

  app.listen(port, () => {
    console.log(`Server runing on ${port}`)
  })
}
bootstrap()
.catch(err => {throw err})