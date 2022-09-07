import { encryptPwd, decodePwd } from "../services/encrypted.service.js";
import { validateUser } from "../services/validator.service.js";
import { generateTokens, verifyToken } from "../services/token.service.js";
import { sendMail } from "../services/mailer.service.js";
import { getUsers, storeUser, updateUser } from "../utils/user.util.js";

const hostUrl = process.env.URL_HOST;

const register = async (req, res, next) => {
  try {
    // validate user
    const { email, password } = await validateUser.validateAsync(req.body);
    const users = await getUsers();
    // check email of user register
    const emailIsExisted = users.some( user => user.email === email);
    if (emailIsExisted)
      throw new Error(`email _ ${email} have been registed already !`);
    // encrypt password
    const pwdEncrypted = await encryptPwd(password);
    // store user into db
    await storeUser({ email: email, password: pwdEncrypted });
    // response to client
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
    // validate user
    const { email, password } = await validateUser.validateAsync(req.body);
    // find user in db
    const users = await getUsers();
    const userIsExisting = users.filter( user => user.email === email)[0];
    if (!userIsExisting) throw new Error(" email incorrect ");
    // decode password 
    const result = await decodePwd(password, userIsExisting.password);
    if (!result) throw new Error(" password incorrect ");
    // generate tokens
    const accessToken = generateTokens({email : email}).accessToken()
    const refreshToken = generateTokens({email : email}).accessToken()
    // store rf token in db of user
    await updateUser(userIsExisting, {
      ...userIsExisting,
      refreshToken: refreshToken,
    });
    // response to client
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
    // find user in db 
    const users = await getUsers();
    const emailIsExisted = users.some( user => user.email === email);
    if (!emailIsExisted)
      throw new Error(`email _ ${email} haven't been registed yet !`);
    // generate forgot token 
    const forgotPwdToken = generateTokens({ email : email }).forgotPwdToken()
    // send mail forgot pwd to user
    await sendMail({
      to: email,
      subject: "RESET PASSWORD USER",
      text: `${hostUrl}/auth/resetPwd?secret=${forgotPwdToken}`,
    });
    // response to client
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
    // verify forgot password token 
    const { email } = verifyToken(forgotPwdToken).forgotPwdToken();
    // response to client 
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
  const authHeader = req.headers.authorization;
  const forgotPwdToken = authHeader && authHeader.split(" ")[1];
  try {
    // verify forgot password token 
    const { email } = verifyToken(forgotPwdToken).forgotPwdToken();
    // validate user
    const { password } = await validateUser.validateAsync({
      email: email,
      password: req.body.password,
    });
    //  find user 
    const users = await getUsers();
    const user = users.filter( user => user.email === email)[0];
    const newUser = JSON.parse(JSON.stringify(user));
    // encrypt password 
    const encryptedPwd = await encryptPwd(password);
    // update user
    newUser.password = encryptedPwd;
    await updateUser(user, newUser);
    // response to client
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
