require('express-async-errors')
require(`dotenv`).config()
const connectDB=require(`./db`)
const express=require(`express`)
const app=express()
const routers=require(`./routes`)
const notFound=require(`./middleware/notFound`)
const errorHandle=require(`./middleware/errorHandle`)

//security middleware
const xss=require(`xss`)
const helmet=require(`helmet`)
const cors=require(`cors`)



//middleware
app.use(express.json())

app.use(`/api/v1`,routers)
app.use(notFound)
app.use(errorHandle)
const PORT=process.env.PORT||3000
const start=async ()=>{
    try{
        console.log("connectDB success")
        app.listen(PORT,console.log(
            `Server is listening on ${PORT}`
        ))
    }catch(err){
        console.log(err)
    }
}
start()