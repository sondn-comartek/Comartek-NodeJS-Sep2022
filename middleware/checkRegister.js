const customErrorAPI=require(`../error/customErrorAPI`)
const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

const checkValidateAccount=(req,res,next)=>{
    const {email,pass}=req.body
    if (!pass)
        throw new customErrorAPI(400,"please input password correct")
    if (!validateEmail(email)||!email)
        throw new customErrorAPI(400,"please input email correct")
    req.user={email,pass}
    next()
}
const checkRepass=(req,res,next)=>{
    if (req.body.repass!=req.user.pass)
      throw new customErrorAPI(400,"repeat password incorrect")
    next()
}

const checkMail=(req,res,next)=>{
  const {email}=req.body
  if (!validateEmail(email))
    throw new customErrorAPI(400,"Email is not validate")
  req.user={email}
  next()
}

const checkUpdatePass=(req,res,next)=>{
  const {newPass,reNewPass,oldPass,logOutAllDevice}=req.body
  if (!oldPass||oldPass.length<8)
    throw new customErrorAPI("Please input correct old password")
  if (!newPass||!reNewPass||newPass!=reNewPass)
    throw new customErrorAPI("please input new password and repeat new password")
  Object.assign(req.user,{oldPass,newPass})
    if(!req.option) req.option={logOutAllDevice}
    else Object.assign(req.option,{logOutAllDevice})
  next()
}



module.exports={
  checkRepass,
  checkValidateAccount,
  checkMail,
  checkUpdatePass
}