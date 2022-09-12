
import { validateEmail , validatePassword } from "../helpers/validator.helper.js"

import { updateUser , findUserByEmail } from "../repos/user.repo.js"

import { generateToken } from "../helpers/token.helper.js";

import { comparePwd } from "../helpers/encrypt.helper.js";

import { errors } from "../utils/constants.js"


const loginService = async (userData) => {
  try {
    const { email } = await validateEmail(userData.email)
    const { password } = await validatePassword(userData.password )
    const { user , error } = await findUserByEmail(email)
    if(error) throw new Error(errors.infoUserIncorrect)
    const isPasswordCorrect = await comparePwd( password, user.password);
    if (!isPasswordCorrect) throw new Error(errors.infoUserIncorrect);
    const accessToken = generateToken({ email: user.email }).accessToken()
    const refreshToken = generateToken({ email: user.email }).refreshToken()
    await updateUser( user, {
      ...user ,
      refreshToken: refreshToken,
    });
    return { accessToken, refreshToken };
  } catch (err) {
    throw err;
  }
};

export { loginService };
