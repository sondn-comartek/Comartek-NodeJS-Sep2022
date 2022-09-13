const jwt = require('jsonwebtoken')

exports.authMiddleware = (socket, next) => {
    const token = socket.handshake.auth.token
    console.log(token)
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    if (!decode.id) {
        socket.close()
    }
    next()
}