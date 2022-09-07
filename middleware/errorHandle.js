const customErrorAPI=require(`../error/customErrorAPI`)
const {MongoError,}=require('mongodb')

const errorHandle=(err,req,res,next)=>{
    console.log(err)
    if (err instanceof customErrorAPI)
        res.status(err.status).json({msg:err.message})
    else 
        if (err instanceof MongoError){
        switch (err.code) {
            case 11000:
                res.status(400).json({msg:"email was exist"})
                break;
            default:
                res.status(400).json({msg:err.message})
                break;
        }
    }
    else 
        res.status(500).json({msg:"Oops, something wrong"})

}
module.exports=errorHandle