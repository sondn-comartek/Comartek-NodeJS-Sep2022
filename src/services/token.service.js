import jwt from "jsonwebtoken" ;
import dotenv from "dotenv";
dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET ;
const forgotPwdTokenSecret = process.env.FORGOT_PWD_TOKEN_SECRET ;


const generateTokens = (payload , type) => {
    if(type === "forgotPwdToken") return jwt.sign( payload , forgotPwdTokenSecret , {
        expiresIn : "3h" ,
    })
    const accessToken = jwt.sign( payload , accessTokenSecret , {
        expiresIn : "3h" ,
    } ) ;
    const refreshToken = jwt.sign( payload , refreshTokenSecret , {
        expiresIn : "7d" ,
    })
    return { accessToken , refreshToken }
}
const verifyToken = (token , type ) => {
    try{
        if(type !== "accessToken" 
            && type !== "refreshToken" 
            && type !== "forgotPwdToken") 
        throw new Error(" type token invalid ")
        return jwt.verify( token , eval(type + "Secret") )
    } catch (err){
        throw err ;
    }
}
export { generateTokens , verifyToken}