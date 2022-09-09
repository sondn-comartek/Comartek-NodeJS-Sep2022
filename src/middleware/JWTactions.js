require("dotenv").config();
import jwt from "jsonwebtoken";

const nonSecurePaths = ['/user/register', '/user/login', '/user/forgotPassword', '/user/updatePassword'];

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET_TOKEN;
    let token = null;
    try {
        token = jwt.sign(payload, key);
    } catch (e) {
        console.log(e)
    }
    return token;
}

const createJWTConfirm = (payload) => {
    let key = process.env.JWT_SECRET_TOKEN;
    let token = null;
    try {
        token = jwt.sign(payload, key);
    } catch (e) {
        console.log(e)
    }
    return token;
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET_TOKEN;
    let decoded = null;
    try {
        decoded = jwt.verify(token, key);
    } catch (err) {
        //reject(e);
        console.log(err);
    }
    return decoded;
}

const createRefreshJWT = (payload) => {
    let key = process.env.JWT_SECRET_REFRESH_TOKEN;
    let refresh_token = null;
    try {
        refresh_token = jwt.sign(payload, key);
    } catch (e) {
        console.log(e)
    }
    return refresh_token;
}

const requestRefreshToken = async (req, res) => {
    let key = process.env.JWT_SECRET_REFRESH_TOKEN;
    let refreshToken = req.cookies.refresh_token;
    if (!refreshToken) return res.status(401).json("You're not logged in");
    let decoded = null;
    jwt.verify(refreshToken, key, (err, decoded) => {
        if (err) {
            console.log(e);
        }
    })
    // Create new access token, refresh token
    const newAccessToken = createJWT(decoded);
    const newRefreshToken = createRefreshJWT(decoded);
    res.cookie("refesh_token", newRefreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false, // khi deploy set lại thành true
        maxAge: 60 * 60 * 1000
    });
    res.status(200).json({ access_token: newAccessToken });
}

// const extractToken = (req) => {
//     if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//         return req.headers.authorization.split(' ')[1];
//     }
//     return null;
// }

const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();
    let cookies = req.cookies;
    let headerToken = req.headers['authorization'];
    //let headerToken = extractToken(req);
    if ((cookies && cookies.jwt) || headerToken) {
        let token = cookies && cookies.jwt ? cookies.jwt : headerToken;
        let decoded = verifyToken(token);
        if (decoded) {
            req.user = decoded;
            next();
        } else {
            return res.status(401).json({
                errCode: -1,
                data: '',
                message: 'Failed verify this account'
            })
        }
    } else {
        return res.status(401).json({
            errCode: -1,
            data: '',
            message: 'Failed verify this account'
        })
    }
}

module.exports = {
    createJWT, verifyToken, checkUserJWT, createRefreshJWT, requestRefreshToken,
    createJWTConfirm
}