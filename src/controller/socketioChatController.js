module.exports = (socket) => {
  console.log('a user connected')
  socket.on('join room', (roomNumber) => {
    socket.join(roomNumber)
    console.log(`join room: ${roomNumber}`)
  }) 
  socket.on('leave room', (roomNumber) => {
    socket.leave(roomNumber)
    console.log(socket.rooms)
    socket.emit("leave room", roomNumber);
  })
  socket.on('chat message', (message, roomID) => {
    if(socket.rooms.has(roomID))
      socket.to(roomID).emit('new message',{message: message, roomID: roomID})
  } )
}