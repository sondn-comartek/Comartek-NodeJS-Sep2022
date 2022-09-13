import dotenv from "dotenv";

dotenv.config();

const env = {
  port: (process.env.PORT = 3000),
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  salt: process.env.SALT_ROUND,
  mailerUser: process.env.MAILER_USER,
  mailerPwd: process.env.MAILER_PASSWORD,
  hostUrl: process.env.HOST_URL,
  mongoUserName : process.env.MONGO_INITDB_USERNAME ,
  mongoPassword : process.env.MONGO_INITDB_PASSWORD ,
};

const errors = {
  infoUserIncorrect: "Email or password incorrect !",
  userNotExisted: "User have not registed yet!",
  curentPwdIncorrect: "Current password is incorrect!",
  passwordsIsSame: "New password must not be same current password!",
  userExisted: "User have been existed!",
  userNotFound: "Can not found user!",
  inputInvalid : "Invalid input!" ,
  inputIsNull : "Input is null!" ,
  conversationNotFound : "Conversation can not found!"
};

const messages = {
  registerSuccess: "Register successfully!",
  registerFail: "Register failed!",
  loginSuccess: "Login successfully!",
  loginFail: "login failed",
  forgotPwdSuccess: "Forgot password successfully!",
  forgotPwdFail: "Forgot password failed!",
  resetPwdSuccess: "Reset password successfully!",
  resetPwdFail: "Reset password failed!",
  updatePwdSucess: "Updated password successfully!",
  updatePwdFail: "Updated password failed!",
  somethingFail: "Oops, something wrong here!",
  somethingSuccess: "Sucessfully!",
  createConversationSuccess : "Create success conversation!"
};

export { env, errors, messages };