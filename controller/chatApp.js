
const { Server, Socket } = require("socket.io");
const getAllMemberOnline=(req,res)=>{
    const count = io.engine.clientsCount;
    res.status(200).json({count})
}
const chatAll=(req,res)=>{
    res.send(`ok`)
    io.on(`connection`,(socket)=>{
        console.log(socket.id+" connected")
        socket.on('on-chat',data=>{
            io.emit(`user-chat`,data)
            console.log(data)
        })
    })
} 

const chatPrivate=()=>{

}

module.exports={
    getAllMemberOnline,
    chatAll,
    chatPrivate
}