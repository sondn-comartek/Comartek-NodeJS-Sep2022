const express=require(`express`)
const axios=require(`axios`)
const fetcha=require(`node-fetch`)
const redis=require(`redis`)



const app=express() 
const PORT=process.env.PORT||5000
const REDIS_PORT=6379
const client=redis.createClient(REDIS_PORT)
client.connect()
.then(()=>client.emit("connect"))
client.on("connect",()=>client.ping())
const setResponse=(username,repos)=>{
    return `<h2>${username} has ${repos} Github repos</h2>`
}
const cache=async(req,res,next)=>{
    try{
        const {username}=req.params
        const repos=await client.get(username)
        if (repos===null)
            throw new Error(`cache miss`)
        console.log("data hit")
        client.expire(username,3600)
        res.status(200).send(setResponse(username,repos))
    }catch(err){
        console.log(err.message)
        next()
    }
}
const getRepos=async (req,res,next)=>{
    try{
        console.log('Fectching data...')
        const {username}=req.params

        const response= await (await fetcha(`https://api.github.com/users/${username}`)).json()
        const repos=response.public_repos
        client.SET(username,repos,{
            EX:3600
        })
        //client.expire(username,3600)
        res.status(200).send(setResponse(username,repos))
    }catch(err){
        console.error(err)
        res.status(500)
    }
}

const getOrSetCache(key,cb)=>{
    return new Promise((resolve,reject)=>{
        client.get(key,async (error,data)=>{
            if (error) return reject(`error`)
            if (data!=null) return resolve(JSON.parse(data))
            const freshData=await cb()
            client.setEx(key,3600,freshData)
            resolve(freshData)
        })
    })
}
app.use(`/repos/:username`,cache,getRepos)
app.listen(PORT,console.log(`listening on ${PORT}`))