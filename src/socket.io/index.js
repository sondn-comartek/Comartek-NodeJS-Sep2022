import { messageHandler } from "./handlers/user.handler.js"; 
import { socketAuthentication } from "../middlewares/authentication.mdw.js";


var io ;

const onConnection = (socket) => {
    messageHandler(io, socket )
}
const socketIoListener = (ioSever) => {
    io = ioSever ;
    io.use( socketAuthentication )
    io.on("connection", onConnection ); 
}


export default socketIoListener ;