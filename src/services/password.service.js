
import { updateUser, findUserByEmail } from "../repos/user.repo.js";
import { validatePassword , validateEmail } from "../helpers/validator.helper.js";
import { generateToken , verifyToken } from "../helpers/token.helper.js";
import { sendMail } from "../helpers/mailer.helper.js";
import { comparePwd , encryptPwd } from "../helpers/encrypted.helper.js";
import constants from "../utils/constants.js";
import errors from "../utils/errors.js";
import deepCloneObj from "../utils/deepCloneObj.js";
import getTokenInAuthHeader from "../utils/getTokenInAuthHeader.js"

const hostUrl = constants.hostUrl

const isCorrectPwd = async (currentPwdUnencrypted , currentPwdEncrypted ) => {
  const correct = await comparePwd(currentPwdUnencrypted,currentPwdEncrypted);
  if (!correct) throw new Error(errors.curentPwdIncorrect);
}

const modifyUserPwd = (user, password) => {
  const cloneUser = deepCloneObj(user) ;
  cloneUser.password = password;
  return user;
};


const checkIsSamePwd = (currentPwd, newPwd) => {
  if (currentPwd === newPwd) throw errors.passwordsIsSame;
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
      text: `${hostUrl}/password/reset?secret=${accessToken}`,
    });
    return;
  } catch (err) {
    throw err;
  }
};

const resetPwdService = async (accessToken) => {
  try {
    const { email } = verifyToken(accessToken).accessToken()
    return { email, accessToken };
  } catch (err) {
    throw err;
  }
};

const updatePwdService = async (authHeader, passwords) => {
  const { currentPwd , newPwd } = passwords;
  try {
    checkIsSamePwd( currentPwd , newPwd);
    const accessToken = getTokenInAuthHeader(authHeader);
    const { email } = verifyToken(accessToken).accessToken();
    const { user , error } = await findUserByEmail(email);
    if(error) throw new Error(errors.userNotExisted)
    await isCorrectPwd( currentPwd , user.password );
    const { password } = await validatePassword(newPwd);
    const encryptedPwd = await encryptPwd(password);
    const newUser = modifyUserPwd(user, encryptedPwd);
    await updateUser(user, newUser);
  } catch (err) {
    throw err;
  }
};
  
  export { forgotPwdService , resetPwdService , updatePwdService };