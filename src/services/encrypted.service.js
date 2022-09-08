import bcrypt from "bcrypt" ;

const saltRounds = 10;

const encryptPwd = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds) ;
    return await bcrypt.hash( password , salt) ;
}

const decodePwd = async (unencryptPwd,pwdEncrypted) => {
    return await bcrypt.compare(unencryptPwd,pwdEncrypted) ;
 }

export  { encryptPwd , decodePwd }