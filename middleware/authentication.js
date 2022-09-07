const customErrorAPI=require(`../error/customErrorAPI`)

const jwt=require(`jsonwebtoken`)
const connectDB=require(`../db`)
const auth=async (req,res,next)=>{
    const db=(await connectDB).db("app")
    const collection=db.collection("account")
    const authHeader=req.headers.authorization
    if(!authHeader||!String(authHeader).startsWith("Bearer "))
        throw new customErrorAPI(401,"Authentication invalid")
    const token=authHeader.split(' ')[1]
    const decoded=await jwt.verify(token,process.env.JWT)
    const {email,time,action}=decoded
    
    if (req.option)
        Object.assign(req.option,{action})
    else req.option={action}
    const query=await  collection.findOne({email})
    if (!query)
        throw new customErrorAPI(400,"Can't find email in database")
    if (!(query.time==time))
            throw new customErrorAPI(401,"Section login expired")
        req.user=query
        next()
}
module.exports=auth