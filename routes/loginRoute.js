const express=require(`express`)
const {register,login,forgotPass,updatePass } = require("../controller/account")
const {checkRepass,checkValidateAccount, checkMail, checkUpdatePass,getAllClientConnect,chat}=require(`../middleware/checkRegister`)
const authen=require(`../middleware/authentication`)
const {}=require(`../controller/account`)
const router=express.Router()
const customErrorAPI=require(`../error/customErrorAPI`)

router.route(`/register`).post(checkValidateAccount,checkRepass,register)
router.route(`/`).post(checkValidateAccount,login)
router.route(`/forgotPass`).patch(checkMail,forgotPass)
router.route(`/updateDatePass`).patch(authen,checkUpdatePass,updatePass)
router.route(`/forgotPass/:token`).get((req,res)=>{
    res.status(200).json({token:req.params.token})
}).post(authen,(req,res,next)=>{
    if(req.option.action!="forgot")
        throw new customErrorAPI(401,"Invalid token")
    req.user.newPass=req.body.newPass
    next()
},updatePass)


module.exports=router