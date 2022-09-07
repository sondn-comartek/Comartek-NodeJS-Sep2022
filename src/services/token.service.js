import jwt from "jsonwebtoken" ;
import dotenv from "dotenv";
dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET ;
const forgotPwdTokenSecret = process.env.FORGOT_PWD_TOKEN_SECRET ;

const generateTokens = ( payload ) => {
    return {
        accessToken(){
            return jwt.sign( payload , accessTokenSecret , {
                expiresIn : "3d"
            })
        } ,
        refreshToken(){
            return jwt.sign( payload , refreshTokenSecret , {
                expiresIn : "7d"
            })
        } ,
        forgotPwdToken(){
            return jwt.sign( payload , forgotPwdTokenSecret , {
                expiresIn : "3d"
            })
        }
    }
}
const verifyToken = (token , type ) => {
    return {
        accessToken(){
            return jwt.verify( token , accessTokenSecret )
        } ,
        refreshToken(){
            return jwt.verify( token , refreshTokenSecret )
        } ,
        forgotPwdToken(){
            return jwt.verify( token , forgotPwdTokenSecret )
        }
    }
}
export { generateTokens , verifyToken}