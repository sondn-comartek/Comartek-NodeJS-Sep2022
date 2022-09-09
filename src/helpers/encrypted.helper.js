import bcrypt from "bcrypt" ;

import constants from "../utils /constants.js";

const saltRound = constants.saltRound

const encryptPwd = async (password) => {
    const salt = await bcrypt.genSalt(saltRound)
    return await bcrypt.hash( password , salt) ;
}

const decodePwd = async (unencryptPwd , pwdEncrypted) => {
    return await bcrypt.compare( unencryptPwd ,pwdEncrypted) ;
 }

export  { encryptPwd , decodePwd }