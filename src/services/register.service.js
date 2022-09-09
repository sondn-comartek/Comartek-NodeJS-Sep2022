
import { validateEmail , validatePassword } from "../helpers/validator.helper.js"

import { getUsers , storeUser } from "../repos/user.repo.js"

import { encryptPwd } from "../helpers/encrypted.helper.js";



const errors = {
  userExisted: "User have been existed !",
};

const registerService = async (userData) => {
  try {
    const { email } = await validateEmail.validateAsync( {email : userData.email });
    const  { password } = await validatePassword.validateAsync({ password : userData.password });
    const users = await getUsers();
    const user = users.some((user) => user.email === email);
    if (user) throw new Error(errors.userExisted);
    const pwdEncrypted = await encryptPwd(password);
    await storeUser({ email: email, password: pwdEncrypted });
  } catch (err) {
    throw err;
  }
};
export { registerService };
