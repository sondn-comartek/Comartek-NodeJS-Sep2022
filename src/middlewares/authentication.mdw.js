import { generateToken , verifyToken } from "../helpers/token.helper.js";
import getTokenInAuthHeader from "../utils/getTokenInAuthHeader.js"

const appAuthentication = (req,res,next) => {
    try {
        const accessToken = getTokenInAuthHeader(req.headers?.authorization)
        const { email } = verifyToken(accessToken).accessToken()
        req.user = email ;
        next()
    }catch(err){
        next({
            error : err ,
            status : 401 
        }) ;
    }
}

const socketAuthentication = ( socket , next ) => {
    try {
        const accessToken = socket.handshake.query?.token
        const { email } = verifyToken(accessToken).accessToken()
        socket.user = email ;
        next() ;
    } catch(err){
        next(err)
    }
}

export {socketAuthentication , appAuthentication} ; 