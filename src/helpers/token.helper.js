import jwt from "jsonwebtoken" ;

import { errors , env} from "../utils/constants.js";

const generateToken = ( payload ) => {
    return {
        accessToken(){
            return jwt.sign( payload , env.accessTokenSecret , {
                expiresIn : "3d"
            })
        } ,
        refreshToken(){
            return jwt.sign( payload , env.refreshTokenSecret , {
                expiresIn : "7d"
            })
        } ,
    }
}

const verifyToken = (token , type ) => {
    return {
        accessToken(){
            return jwt.verify( token , env.accessTokenSecret )
        } ,
        refreshToken(){
            return jwt.verify( token , env.refreshTokenSecret )
        } ,
    }
}
export { generateToken , verifyToken}