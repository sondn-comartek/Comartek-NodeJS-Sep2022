import bcrypt from "bcrypt" ;

const saltRounds = 10;

const encryptPwd = async (password) => {
   try {
    const salt = await bcrypt.genSalt(saltRounds) ;
    return await bcrypt.hash( password , salt) ;
   } catch (err){
       throw err ;
   }
}

const decodePwd = async (unencryptPwd,pwdEncrypted) => {
    try {
     return await bcrypt.compare(unencryptPwd,pwdEncrypted) ;
    } catch (err){
        throw err ;
    }
 }

export  { encryptPwd , decodePwd }