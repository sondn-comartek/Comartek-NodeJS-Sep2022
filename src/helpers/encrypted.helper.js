import bcrypt from "bcrypt" ;

import constants from "../utils/constants.js";

const saltRound = constants.saltRound

const encryptPwd = async (password) => {
    const salt = await bcrypt.genSalt(saltRound)
    return await bcrypt.hash( password , salt) ;
}

const comparePwd = async ( UnencryptPwd , pwdEncrypted) => {
    return await bcrypt.compare( UnencryptPwd ,pwdEncrypted) ;
}

export  { encryptPwd , comparePwd }