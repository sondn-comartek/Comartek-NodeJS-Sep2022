import { encryptPwd, decodePwd } from "../services/encrypted.service.js";
import { validateUser } from "../services/validator.service.js";
import { generateTokens, verifyToken } from "../services/token.service.js";
import { sendMail } from "../services/mailer.service.js";
import { getUsers, storeUser, updateUser } from "../utils/user.util.js";

const hostUrl = process.env.URL_HOST;

const register = async (req, res, next) => {
  try {
    // validate user data of client send to server 
    const { email , password } = await validateUser.validateAsync(req.body);
    // check email of user data after validated 
    const users = await getUsers();
    const emailIsExisted = users.some( user => user.email === email);
    // if email exist in db , fire the error 
    if (emailIsExisted)
      throw new Error(`email _ ${email} have been registed already !`);
    // otherwise encrypt the password
    const pwdEncrypted = await encryptPwd(password);
    // store user is encrypted password into db
    await storeUser({ email: email, password: pwdEncrypted });
    // response data to client 
    return res.status(201).json({
      success: true,
      message: "register successfully ! ",
    });
  } catch (err) {
    next({
      err,
      status: 403,
    });
  }
};

const login = async (req, res, next) => {
  try {
    // validate user data of client send to server 
    const { email, password } = await validateUser.validateAsync(req.body);
    // find user data in db 
    const users = await getUsers();
    const userIsExisting = users.filter( user => user.email === email)[0];
    // if user isn't exist in db  in db , fire error 
    if (!userIsExisting) throw new Error(" email incorrect ");
    // otherwise decode the password of client send to server and compare with the password of user 
    const result = await decodePwd(password, userIsExisting.password);
    // if not true , fire error
    if (!result) throw new Error(" password incorrect ");
    // otherwise generate tokens 
    const accessToken = generateTokens({email : email}).accessToken()
    const refreshToken = generateTokens({email : email}).accessToken()
    // store rf token in db of user
    await updateUser(userIsExisting, {
      ...userIsExisting,
      refreshToken: refreshToken,
    });
    // response data to client
    return res.status(200).json({
      success: true,
      message: "login successfully",
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next({
      err,
      status: 403,
    });
  }
};

const forgotPwd = async (req, res, next) => {
  const email = req.body.email;
  try {
    // find user have email of client send to server    
    const users = await getUsers();
    const emailIsExisted = users.some( user => user.email === email);
    // if user isn't exist , fire error
    if (!emailIsExisted)
      throw new Error(`email _ ${email} haven't been registed yet !`);
    // otherwise genarate token
    const forgotPwdToken = generateTokens({ email : email }).forgotPwdToken()
    // send mail to email of user with the link have this token
    await sendMail({
      to: email,
      subject: "RESET PASSWORD USER",
      text: `${hostUrl}/auth/resetPwd?secret=${forgotPwdToken}`,
    });
    // response data to client
    return res.status(250).json({
      success: true,
      message: "forgot password successfully",
    });
  } catch (err) {
    next({
      err,
      status: 403,
    });
  }
};

const resetPwd = async (req, res, next) => {
  try {
    const forgotPwdToken = req.query.secret;
    // server verify forgot password token
    const { email } = verifyToken(forgotPwdToken).forgotPwdToken();
    // if valid , accept implement the update password
    res.status(200).json({
      success: true,
      email : email , 
      forgotPwdToken: forgotPwdToken,
      url: `${hostUrl}/auth/updatePwd`,
    });
  } catch (err) {
    next({
      err,
      status: 403,
    });
  }
};

const updatePwd = async (req, res, next) => {
  // client send forgot password token to server
  const authHeader = req.headers.authorization;
  const forgotPwdToken = authHeader && authHeader.split(" ")[1];
  try {
    // server verify forgot password token 
    const { email } = verifyToken(forgotPwdToken).forgotPwdToken();
    // validate the password
    const { password } = await validateUser.validateAsync({
      email: email,
      password: req.body.password,
    });
    // find user who send update new password request 
    const users = await getUsers();
    const user = users.filter( user => user.email === email)[0];
    // encrypt password and update new password 
    const newUser = JSON.parse(JSON.stringify(user));
    const encryptedPwd = await encryptPwd(password);
    newUser.password = encryptedPwd;
    // store new password in db
    await updateUser(user, newUser);
    // response data to client
    return res.status(201).json({
      success: true,
      message: "password updated !",
    });
  } catch (err) {
    next({
      err,
      status: 403,
    });
  }
};

export { register, login, forgotPwd, resetPwd, updatePwd };
