
import { getUsers , updateUser } from "../repos/user.repo.js"
import { validatePassword , validateEmail } from "../helpers/validator.helper.js";
import { generateToken , verifyToken } from "../helpers/token.helper.js";
import { sendMail } from "../helpers/mailer.helper.js";
import { decodePwd, encryptPwd } from "../helpers/encrypted.helper.js";

import constants from "../utils /constants.js"; 

const hostUrl = constants.hostUrl

const errors = {
    userNotExisted : 'Have not registed yet!' ,
    curentPwdIncorrect : "Current password is incorrect!" ,
    passwordsIsSame : 'New password must not be same current password!'
}

const forgotPwdService = async (emailUnvalidate) => {
    try {
      const { email } = await validateEmail(emailUnvalidate)
      const users = await getUsers() ;
      const user = users.some( user => user.email === email);
      if (!user) throw new Error( email + " " + errors.userNotExisted)
      const forgotPwdToken = generateToken({ email : email }).forgotPwdToken()
      await sendMail({
        to: email ,
        subject: "RESET PASSWORD USER",
        text: `${hostUrl}/password/reset?secret=${forgotPwdToken}`,
      });
      return ;
    } catch (err) {
      throw(err)
    }
  };
  
  const resetPwdService = async (forgotPwdToken) => {
    try {
      const { email } = verifyToken(forgotPwdToken).forgotPwdToken();
      return { email , forgotPwdToken } ;
    } catch (err) {
      throw err ;
    }
  };
  
  const updatePwdService = async ( authHeader , passwords ) => {
    try {
      const { currentPwd , newPwd } = passwords
      if(currentPwd === newPwd) throw new Error(errors.passwordsIsSame) 
      const forgotPwdToken = authHeader && authHeader.split(" ")[1];
      const { email } = verifyToken(forgotPwdToken).forgotPwdToken();
      const users = await getUsers();
      const user = users.filter( user => user.email === email)[0];
      const isIncorrectPwd = await decodePwd(currentPwd , user.password)
      if(!isIncorrectPwd) throw new Error(errors.curentPwdIncorrect) 
      const { password } =  await validatePassword(newPwd)
      const encryptedPwd = await encryptPwd(password);
      const newUser = JSON.parse(JSON.stringify(user));
      newUser.password = encryptedPwd;
      await updateUser(user, newUser);
    } catch (err) {
      throw err ;
    }
  };
  
  export { forgotPwdService , resetPwdService , updatePwdService };