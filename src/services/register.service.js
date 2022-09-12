
import { validateEmail , validatePassword } from "../helpers/validator.helper.js"

import { findUserByEmail, storeUser } from "../repos/user.repo.js";

import { encryptPwd } from "../helpers/encrypt.helper.js";

import { errors } from "../utils/constants.js"

const registerService = async (userData) => {
  try {
    const { email } = await validateEmail(userData.email);
    const { password } = await validatePassword(userData.password);
    const { user , error } = await findUserByEmail(email);
    if (user) throw new Error(errors.userExisted);
    const pwdEncrypted = await encryptPwd(password);
    await storeUser({
      email: email,
      password: pwdEncrypted,
    });
  } catch (err) {
    throw err;
  }
};
export { registerService };
