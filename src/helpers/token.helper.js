import jwt from "jsonwebtoken" ;

import constants from "../utils/constants.js";

const accessTokenSecret = constants.accessTokenSecret ;
const refreshTokenSecret = constants.refreshTokenSecret ;

const generateToken = ( payload ) => {
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
    }
}
export { generateToken , verifyToken}