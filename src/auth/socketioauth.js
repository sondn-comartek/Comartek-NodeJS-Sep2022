const jwt = require('jsonwebtoken')
const authMiddleware =  (socket, next) => {
  const token = socket.handshake.query.access_token
  const secretKey = process.env.JWT_KEY
  const decode = jwt.verify(token, secretKey)
  if(!decode.data)
    socket.close()
  next()
  
}
module.exports = authMiddleware