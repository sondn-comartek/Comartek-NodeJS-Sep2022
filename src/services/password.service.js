
import { updateUser, findUserByEmail } from "../repos/user.repo.js";
import { validatePassword , validateEmail } from "../helpers/validator.helper.js";
import { generateToken , verifyToken } from "../helpers/token.helper.js";
import { sendMail } from "../helpers/mailer.helper.js";
import { comparePwd , encryptPwd } from "../helpers/encrypt.helper.js";
import { errors , env } from "../utils/constants.js"
import deepCloneObj from "../utils/deepCloneObj.js";
import getTokenInAuthHeader from "../utils/getTokenInAuthHeader.js"


const checkPwdIsCorrect = async (currentPwdUnencrypted , currentPwdEncrypted ) => {
  try{
    const result = currentPwdUnencrypted && currentPwdEncrypted && await comparePwd(currentPwdUnencrypted,currentPwdEncrypted);
    if (!result) throw new Error(errors.curentPwdIncorrect);
    return result;
  }catch(err){
    throw err;
  }
}

const modifyUserPwd = ( user, password ) => {
  if(
    !user ||
    !password ||
    typeof user !== 'object' ||
    typeof password !== 'string' ||
    user.constructor !== Object
  ) throw new Error(errors.inputInvalid)
  const cloneUser = deepCloneObj(user);
  cloneUser.password??='undifined'
  cloneUser.password=password;
  return user;
};

const checkPwdIsSame = (currentPwd, newPwd) => {
  if (typeof currentPwd !=='string' || typeof newPwd !== 'string') {
    throw new Error(errors.inputInvalid) 
  } else if (currentPwd === newPwd) throw new Error(errors.passwordsIsSame)
  return;
};

const forgotPwdService = async (emailUnvalidate) => {
  try {
    const { email } = await validateEmail(emailUnvalidate);
    const { user , error } = await findUserByEmail(email) ;
    if(error) throw new Error(errors.userNotExisted + `<${email}>`)
    const accessToken = generateToken({ email: email }).accessToken()
    await sendMail({
      to: email,
      subject: "RESET PASSWORD USER",
      text: `${env.hostUrl}/password/reset?secret=${accessToken}`,
    });
    return;
  } catch (err) {
    throw err;
  }
};

const resetPwdService = async (accessToken) => {
  if(!accessToken) throw new Error(errors.inputIsNull)
  try {
    const { email } = verifyToken(accessToken).accessToken()
    return { email, accessToken };
  } catch (err) {
    throw err;
  }
};

const updatePwdService = async (authHeader, passwords) => {
  if(!authHeader || !passwords) throw new Error(errors.inputIsNull)
  const { currentPwd , newPwd } = passwords;
  try {
    checkPwdIsSame( currentPwd , newPwd);
    const accessToken = getTokenInAuthHeader(authHeader);
    const { email } = verifyToken(accessToken).accessToken();
    const { user , error } = await findUserByEmail(email);
    if(error) throw new Error(errors.userNotExisted)
    await checkPwdIsCorrect( currentPwd , user.password );
    const { password } = await validatePassword(newPwd);
    const encryptedPwd = await encryptPwd(password);
    const newUser = modifyUserPwd(user, encryptedPwd);
    await updateUser(user, newUser);
  } catch (err) {
    throw err;
  }
};
  
  export { forgotPwdService , resetPwdService , updatePwdService , checkPwdIsCorrect , modifyUserPwd , checkPwdIsSame };