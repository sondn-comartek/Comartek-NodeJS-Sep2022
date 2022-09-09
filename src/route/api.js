// Phương pháp REST API: create/ put/ delete
// Khai báo tất cả các route, 1 server là 1 app
import express from "express";
import UserController from "../controllers/UserController";
import {
    checkUserJWT
} from "../middleware/JWTactions";

let router = express.Router();

let initApiRoutes = (app) => {
    //All apis
    router.all('*', checkUserJWT);

    // Api Register
    router.post('/user/register', UserController.handleRegister);

    // Api Login
    router.post('/user/login', UserController.handleLogin);

    // Api Forgot password
    router.post('/user/forgotPassword', UserController.handleForgotPassword);

    // Api Refresh token
    //router.post('/api/refreshtoken', requestRefreshToken, '*');

    // Api Update Password
    router.put('/user/updatePassword', UserController.handleUpdatePassword);

    return app.use("/", router);
}

module.exports = initApiRoutes