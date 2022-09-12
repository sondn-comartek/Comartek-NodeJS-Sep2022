import bcrypt from "bcrypt" ;

import { errors , env } from "../utils/constants.js";


const encryptPwd = async (password) => {
    const salt = await bcrypt.genSalt(env.saltRound)
    return await bcrypt.hash( password , salt) ;
}

const comparePwd = async ( UnencryptPwd , pwdEncrypted) => {
    return await bcrypt.compare( UnencryptPwd ,pwdEncrypted) ;
}

export  { encryptPwd , comparePwd }