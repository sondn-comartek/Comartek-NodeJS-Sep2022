import { forgotPwdService , resetPwdService , updatePwdService } from "../services/password.service.js";
import { messages , env } from "../utils/constants.js"


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
      const { email , accessToken } = await resetPwdService(req.query.secret)
      res.status(200).json({
        success: true,
        email : email , 
        messages : messages.resetPwdSuccess ,
        accessToken: accessToken,
        url: `${env.hostUrl}/password/update`,
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