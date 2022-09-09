
import { validateEmail , validatePassword } from "../helpers/validator.helper.js"

import { getUsers , storeUser } from "../repos/user.repo.js"

import { encryptPwd } from "../helpers/encrypted.helper.js";

const errors = {
  userExisted: "User have been existed !",
};

const checkStatusMail = async (email) => {
  const users = await getUsers();
  const user = users.some( (user) => user.email === email);
  if(user) throw new Error(errors.userExisted) ;
  return ;
}

const registerService = async (userData) => {
  try {
    const { email } = await validateEmail(userData.email)
    const { password } = await validatePassword(userData.password )
    await checkStatusMail(email)
    const pwdEncrypted = await encryptPwd( password );
    await storeUser({ email: email, password: pwdEncrypted });
  } catch (err) {
    throw err;
  }
};
export { registerService };
