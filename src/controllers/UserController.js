import UserLogin_RegisterService from "../services/UserLogin_RegisterService";
//import handleUserRegister from "../services/UserLogin_RegisterService";

const handleRegister = async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    console.log(req.body);
    if (!username || !password) {
        return res.status(500).json({
            status: 1,
            errCode: 1,
            message: 'Missing required parameters'
        })
    }

    let userData = await UserLogin_RegisterService.handleUserRegister(username, password, res);
    return res.status(200).json({
        status: userData.status,
        errCode: userData.errCode,
        message: userData.errMessage
    })
}

/* Solution for 'Login'
- Step1: Check if username and password exist or not respectively: debug username, password
    Check username first-> then check password
- Step2: return UserInfo: username, password, access_token ( JWT )
*/
const handleLogin = async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    if (!req.body.username || !req.body.password) {
        return res.status(500).json({
            status: 1,
            errCode: 1,
            message: 'Your username or password cannot be blank'
        })
    }

    let userData = await UserLogin_RegisterService.handleUserLogin(username, password, res);

    return res.status(200).json({
        status: userData.status,
        errCode: userData.errCode,
        message: userData.errMessage,
        data: userData.info ? userData.info : {}
    })
}

const handleForgotPassword = async (req, res) => {
    const { username, email } = req.body
    if (!username || !email) {
        return res.status(500).json({
            status: 1,
            errCode: 1,
            message: 'Your username or email cannot be blank'
        })
    }

    let userData = await UserLogin_RegisterService.handleUserForgotPassword(username, email, res);
    return res.status(200).json({
        status: userData.status,
        errCode: userData.errCode,
        message: userData.errMessage,
        data: userData.info ? userData.info : {}
    })
}

const handleUpdatePassword = async (req, res) => {
    let data = req?.body;
    let message = await UserLogin_RegisterService.handleUserUpdatePassword(data);
    return res.status(200).json(message);
}

module.exports = {
    handleRegister: handleRegister,
    handleLogin: handleLogin,
    handleForgotPassword: handleForgotPassword,
    handleUpdatePassword: handleUpdatePassword,
}