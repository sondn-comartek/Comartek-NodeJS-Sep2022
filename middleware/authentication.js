const jwt=require(`jsonwebtoken`)
const connectDB=require(`../db`)
const auth=async (req,res,next)=>{
    const db=(await connectDB).db("app")
    const collection=db.collection("account")
    const authHeader=req.headers.authorization
    if(!authHeader||!String(authHeader).startsWith("Bearer "))
        throw new Error("Authentication invalid")
    const token=authHeader.split(' ')[1]
    try{
        const decoded=jwt.verify(token,process.env.JWT)
        const {email,time}=decoded
        const query=await   collection.findOne({email})
        if (!query)
            throw new Error("Can't find email in database")
        if (!(query.time==time))
            throw new Error("Section login expired")
        req.user=query
        next()
    }catch(err){
        throw err
    }
}
module.exports=auth