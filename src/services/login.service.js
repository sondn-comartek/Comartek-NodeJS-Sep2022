
import { validateEmail , validatePassword } from "../helpers/validator.helper.js"

import { getUsers , updateUser } from "../repos/user.repo.js"

import { generateToken } from "../helpers/token.helper.js";

import { decodePwd } from "../helpers/encrypted.helper.js";


const errors = {
  userIncorrect: "Email or password incorrect !",
};


const loginService = async (userData) => {
  try {
    const { email } = await validateEmail.validateAsync({email : userData.email });
    const { password } = await validatePassword.validateAsync({password : userData.password});
    const users = await getUsers();
    const user = users.filter( (user) => user.email === email)[0];
    if (!user) throw new Error(errors.userIncorrect);
    const result = await decodePwd(password, user.password);
    if (!result) throw new Error(errors.userIncorrect);
    const accessToken = generateToken({ email: user.email }).accessToken();
    const refreshToken = generateToken({ email: user.email }).refreshToken();
    await updateUser(user, {
      ...user,
      refreshToken: refreshToken,
    });
    return { accessToken, refreshToken };
  } catch (err) {
    throw err;
  }
};

export { loginService };
