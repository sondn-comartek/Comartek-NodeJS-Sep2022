
import { validateEmail , validatePassword } from "../helpers/validator.helper.js"

import { getUsers , updateUser } from "../repos/user.repo.js"

import { generateToken } from "../helpers/token.helper.js";

import { decodePwd } from "../helpers/encrypted.helper.js";


const errors = {
  infoUserIncorrect: "Email or password incorrect !",
};

const findUser = async (email) => {
  const users = await getUsers();
  const user = users.filter( (user) => user.email === email)[0];
  if (!user) throw new Error(errors.infoUserIncorrect);
  return user ;
}

const loginService = async (userData) => {
  try {
    const { email } = await validateEmail(userData.email)
    const { password } = await validatePassword(userData.password )
    const user = await findUser(email)
    const isPasswordCorrect = await decodePwd(password, user.password);
    if (!isPasswordCorrect) throw new Error(errors.infoUserIncorrect);
    const accessToken = generateToken({ email: user.email }).accessToken();
    const refreshToken = generateToken({ email: user.email }).refreshToken();
    await updateUser(user, {
      ...user ,
      refreshToken: refreshToken,
    });
    return { accessToken, refreshToken };
  } catch (err) {
    throw err;
  }
};

export { loginService };
