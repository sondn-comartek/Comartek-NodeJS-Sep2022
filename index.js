require('express-async-errors')
require(`dotenv`).config()
const connectDB=require(`./db`)
const express=require(`express`)
const app=express()
const routers=require(`./routes`)
const notFound=require(`./middleware/notFound`)
const errorHandle=require(`./middleware/errorHandle`)

//security middleware
const xss=require(`xss-clean`)
const helmet=require(`helmet`)
const cors=require(`cors`)
//const rateLimiter=require(`express-rate-limit`)



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