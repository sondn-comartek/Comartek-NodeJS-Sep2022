import { forgotPwdService , resetPwdService , updatePwdService } from "../services/password.service.js";
import constants from "../utils /constants.js";

const hostUrl = constants.hostUrl ;

const messages = {
  forgotPwdSuccess :  "Forgot password successfully!" ,
  forgotPwdFail :  "Forgot password failed!",
  resetPwdSuccess : "Reset password successfully!" ,
  resetPwdFail : "Reset password failed!" ,
  updatePwdSucess : "Updated password successfully!",
  updatePwdFail : "Updated password failed!"
}

const forgotPwd = async (req, res, next) => {
    try {
      await forgotPwdService(req.body.email)
      return res.status(250).json({
        success: true,
        message:  messages.forgotPwdSuccess,
      });
    } catch (err) {
      next({
        err,
        status: 403,
        message : messages.forgotPwdFail
      });
    }
  };
  
  const resetPwd = async (req, res, next) => {
    try {
      const { email , forgotPwdToken } = await resetPwdService(req.query.secret)
      res.status(200).json({
        success: true,
        email : email , 
        messages : messages.resetPwdSuccess ,
        forgotPwdToken: forgotPwdToken,
        url: `${hostUrl}/password/update`,
      });
    } catch (err) {
      next({
        err,
        message : messages.resetPwdFail ,
        status: 403,
      });
    }
  };
  
  const updatePwd = async (req, res, next) => {
    try {
      await updatePwdService( req.headers.authorization , req.body )
      return res.status(201).json({
        success: true,
        message: messages.updatePwdSucess,
      });
    } catch (err) {
      next({
        err,
        message : messages.updatePwdFail,
        status: 403,
      });
    }
  };
  
  export { forgotPwd, resetPwd, updatePwd };