module.exports = socket => {
    console.log('a user connected')

    socket.on('join room', (roomNumber) => {
        socket.join(roomNumber)
        console.log(`join room : ${roomNumber}`)
    })

    socket.on('leave room', (roomNumber) => {
        socket.leave(roomNumber)
        console.log(`leave room : ${roomNumber}`)
        socket.emit('leave', roomNumber)
    })
    socket.on('chat', (msg, roomID) => {
        if (socket.rooms.has(roomID)) {
            socket.to(roomID).emit('new message', { message: msg, roomID })
        }
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
}