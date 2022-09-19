const jwt = require('jsonwebtoken')

exports.authMiddleware = (socket, next) => {
    console.log(socket.handshake)
    const token = socket.handshake.headers.token
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    if (!decode.id) {
        socket.close()
    }
    next()
}
