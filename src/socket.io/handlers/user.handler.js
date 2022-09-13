const messageHandler = ( io , socket) => {
    socket.on('client send public message' , (data) => {
        io.emit('server send public message' , data) ;
    })
    // socket.on("private message", (anotherSocketId, msg) => {
    //     socket.to(anotherSocketId).emit("private message", socket.id, msg);
    // });
}

export  { messageHandler }