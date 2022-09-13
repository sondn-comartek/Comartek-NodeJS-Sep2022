require('express-async-errors')
require(`dotenv`).config()
const connectDB=require(`./db`)
const express=require(`express`)
const app=express()
const routers=require(`./routes`)
const notFound=require(`./middleware/notFound`)
const errorHandle=require(`./middleware/errorHandle`)
//socketIO
const http=require(`http`)
const server=http.createServer(app)
const {Server}=require(`socket.io`)
const io=new Server(server)
const PORT=process.env.PORT||3000
const jwt=require(`jsonwebtoken`)
io.use(async (socket,next)=>{
    const token=socket.handshake.headers.token
    console.log(`first time`)
    try {
        const decode=await jwt.decode(token,process.env.JWT)
        const {email}=decode
        if (!email) throw new customErrorAPI(401,`can't auth`)
        socket.data.user=email
        next()
        console.log(io.engine.clientsCount)
    }catch(err){
        next(new Error("unauthorized event"))
    }

})
io.on("connection",(socket)=>{
    console.log(socket.id +" connected")
    socket.on("on-chat",data=>{
        socket.broadcast.emit("on-chat",socket.data.user+': '+data)
        console.log(socket.data.user+': '+data)
    })
})

//security middleware
const xss=require(`xss-clean`)
const helmet=require(`helmet`)
const cors=require(`cors`)
const rateLimiter=require(`express-rate-limit`)
const { decode } = require('punycode')
const customErrorAPI = require('./error/customErrorAPI')



//middleware
app.use(express.json())
app.use(
    rateLimiter({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    })
  )
app.use(`/api/v1`,routers)
app.use(notFound)
app.use(errorHandle)



const start=async ()=>{
    try{
        console.log("connectDB success")
        server.listen(PORT,console.log(
            `Server is listening on ${PORT}`
        ))
    }catch(err){
        console.log(err)
    }
}
start()
