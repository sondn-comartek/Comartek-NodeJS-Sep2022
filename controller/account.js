const connectDB=require(`../db`)
const bcrypt=require(`bcrypt`)
const jwt=require(`jsonwebtoken`)
const sendLink=require(`./sendmail`)
const customErrorAPI=require(`../error/customErrorAPI`)

const register=async (req,res,next)=>{
    console.log("register connectDB...")
    const db=(await connectDB).db("app")
    const collection=db.collection("account")
    //to do middleware check req.user{email.pass}
    let {email,pass}=req.user
    console.log(req.user)
    const salt=await bcrypt.genSalt(10)
    pass=await bcrypt.hash(pass,salt)
    const rs=await collection.insertOne({email,pass,time: Date.now()})
    res.status(201).json({msg:"create account complete",data:{rs}})
}

const login=async (req,res,next)=>{
    const {email,pass:passInput}=req.user
    const db=(await connectDB).db("app")
    const collection=db.collection("account")
    const query=await collection.findOne({email})
    if (!query){
        throw new customErrorAPI(400,"Email is not in database")
    }
    const {time,pass:passDatabase}=query
    const validatePass=await bcrypt.compare(passInput,passDatabase)

    if (!validatePass)
        throw (new customErrorAPI(400,"Password is incorrect"))
    const tokenShort=jwt.sign({email,time,action:"login"},process.env.JWT,{expiresIn:'0.25h'})
    const tokenLong=jwt.sign({email,time,action:"login"},process.env.JWT,{expiresIn:'30d'}) 
    res.status(200).json({tokenLong,tokenShort})
    console.log({msg:`${email} has login`,tokenLong,tokenShort})
}
const forgotPass=async (req,res,next)=>{
     const {email}=req.user
    const db=(await connectDB).db("app")
    const collection=db.collection("account")
    const rs=await collection.findOne({email})
    if (!rs) 
        throw new customErrorAPI(400,`Please provide correct email`)
    const {time}=rs
    const token=await jwt.sign({email,time,action:"forgot"},process.env.JWT,{expiresIn:'3d'})
    const link=req.protocol + '://' + req.get('host') + req.originalUrl+"/"+token
    sendLink(link,email)
    res.status(200).json({msg:"check mail please"})
}
const updatePass=async (req,res,next)=>{
    const db=(await connectDB).db("app")
    const collection=db.collection("account")
    if (req.option.action=="login"){
        const validateOldPass=await bcrypt.compare(req.user.oldPass,req.user.pass)
        if (!validateOldPass) throw new customErrorAPI(400,"Incorrect Old Password")
    }
    const pass=await bcrypt.hash(req.user.newPass,await bcrypt.genSalt(10))
    const objectQuery={pass}
    if (req.option.logOutAllDevices==true)
        objectQuery.time=Date.now()
    console.log(objectQuery)
    const rs=await collection.updateOne({email:req.user.email},{$set:objectQuery})
    console.log(rs)
    res.status(200).json({msg:"update password complete"})
}   
const chat=(req,res,next)=>{

}
const getAllClientConnect=(req,res,next)=>{

} 
module.exports={
    chat,
    getAllClientConnect,
    register,
    login,
    forgotPass,
    updatePass
}