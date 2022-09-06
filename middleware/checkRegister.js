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
        throw new Error("please input password correct")
    if (pass.length<8)
      throw new Error("please input password have length at least 8 char")
    if (!validateEmail(email)||!email)
        throw new Error("please input email correct")
    req.user={email,pass}
    next()
}
const checkRepass=(req,res,next)=>{
    if (req.body.repass!=req.user.pass)
      throw new Error("repeat password incorrect")
    next()
}

const checkMail=(req,res,next)=>{
  const {email}=req.body
  if (!validateEmail(email))
    throw new Error("Email is not validate")
  req.user={email}
  next()
}

const checkUpdatePass=(req,res,next)=>{
  const {newPass,reNewPass,oldPass,logOutAllDevice}=req.body
  if (!oldPass||oldPass.length<8)
    throw new Error("Please input correct old password")
  if (!newPass||!reNewPass||newPass!=reNewPass)
    throw new Error("please input new password and repeat new password")
  Object.assign(req.user,{oldPass,newPass})
    req.option={logOutAllDevice}
  next()
}



module.exports={
  checkRepass,
  checkValidateAccount,
  checkMail,
  checkUpdatePass
}