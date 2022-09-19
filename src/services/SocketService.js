export const connection = (socket) => {
    console.log(`user ${socket.data.username} with id::${socket.id} connected!`);
    socket.on('chat', (msg) => {
        console.log("msg is::", msg);
        socket.broadcast.emit('chat', `${msg.name}:: ${msg.message}`);
    })
}