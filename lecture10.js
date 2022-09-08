const consoleLog=()=>{
    current =new Date()
    xMast=new Date(`12/25/`+current.getFullYear())
    console.log(Math.round((xMast-current)/1000) + " seconds")
}

const createServer=()=>{
    const express=require(`express`)
    const app=express()
    const router=require(`./router`)

    app.use(express.json())
    app.use(`/`,router)

    app.listen(3000,(console.log("listening on port 3000")))
}
createServer()