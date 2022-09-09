require('dotenv').config();
import db from "../models/index";
import bcrypt, { hash } from "bcrypt";
import nodemailer from "nodemailer";
import { createJWT, createRefreshJWT, createJWTConfirm } from "../middleware/JWTactions";
const salt = bcrypt.genSaltSync(10);

// Register service
let handleUserRegister = (username, password, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check if this username is already in the database or not
            let userData = {};
            let isExist = await checkUsername(username);
            console.log(isExist)
            if (!isExist) {
                // Hash password
                let hashPassword = hashUserPassword(password);
                // Create new user
                await db.ADM_User.create({
                    Username: username,
                    Password: hashPassword
                })
                userData.status = 0,
                    userData.errCode = 0;
                userData.errMessage = 'Register successfully';
            } else {
                userData.status = 1;
                userData.errCode = 1;
                userData.errMessage = 'This username already exists';
            }
            resolve(userData);
        } catch (e) {
            console.log(e);
            //reject(e);
            return {
                status: 1,
                errCode: -2,
                errMessage: `Something wrong with this data`
            };
        }
    })
}

// Login service
let handleUserLogin = (username, password, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUsername(username);
            console.log(isExist);
            if (isExist) {
                // Check if this person exist in the database or not
                let user = await db.ADM_User.findOne({
                    //attributes: ['ID_User', 'Username', 'Password'],
                    where: { Username: username },
                    //raw: true,
                })
                if (username) {
                    // Compare non-encrypted password to the encrypted one
                    let comparePassword = bcrypt.compareSync(password, user.Password);
                    if (comparePassword) {
                        // Create payload for access token
                        let payload_token = {
                            username: username.Username,
                            expiresIn: process.env.JWT_TOKEN_LIFE
                        }
                        // Payload for refresh token
                        let payload_refresh_token = {
                            username: username.Username,
                            expiresIn: process.env.JWT_REFRESH_TOKEN_LIFE
                        }
                        // Create access token and refresh token
                        let access_token = createJWT(payload_token);
                        let refresh_token = createRefreshJWT(payload_refresh_token);
                        userData.status = 0;
                        userData.errCode = 0;
                        userData.errMessage = 'Log in succesfully';
                        userData.info = {
                            access_token: access_token,
                        }
                        // Save refresh token in a cookie
                        res.cookie("refesh_token", refresh_token, {
                            httpOnly: true,
                            sameSite: 'strict',
                            secure: false, // Set to `true` when deploying
                            maxAge: 60 * 60 * 1000
                        });
                    } else {
                        userData.status = 1;
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password'
                    }
                } else {
                    // Loi dang nhap
                    userData.status = 1;
                    userData.errCode = 2;
                    userData.errMessage = `Cannot find this username`;
                }
            } else {
                userData.status = 1;
                userData.errCode = 1;
                userData.errMessage = `This username does not exist`
            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}

// Forgot password 
const handleUserForgotPassword = (username, email, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUsername(username);
            if (isExist) {
                // Check if this person exist in the database or not
                let user = await db.ADM_User.findOne({
                    //attributes: ['ID_User', 'Username', 'Password'],
                    where: { Username: username },
                    //raw: true,
                })
                if (user) {
                    // Create payload for email token
                    let payload_token = {
                        username: username,
                        email: email,
                        expiresIn: process.env.JWT_TOKEN_EMAIL_LIFE
                    }
                    // Create email token
                    let email_token = createJWTConfirm(payload_token);
                    // Generate a link via email
                    //const url = `http://localhost:8080/confirmation/updatePasswpord/${email_token}`;
                    const url = req.protocol + '://' + req.get('host') + req.originalUrl + "/" + email_token;
                    userData.status = 0;
                    userData.errCode = 0;
                    userData.errMessage = 'Link is sended via this email';
                    userData.info = {
                        username: username,
                        email_token: email_token,
                        link: url
                    }
                    console.log(url);
                    let transporter = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true,
                        auth: {
                            user: '',
                            pass: ''
                        }
                    });

                    let mailOption = {
                        from: `khoinguyenhdk@comartek.com`,
                        to: email,
                        subject: `Confirm email`,
                        html: `Please click this mail to confirm changing password:
                        <a href="${url}">${url}</a>`
                    }
                    await transporter.sendMail(mailOption, function (err, info) {
                        if (err) {
                            console.log(err);
                            userData.errMessage = `Something's wrong while sending email` + err;
                        } else {
                            console.log('Message sent: ' + info.response);
                            userData.errMessage = 'An email has been sended';
                        }
                    })
                    resolve(userData);
                } else {
                    userData.status = 1;
                    userData.errCode = 2;
                    userData.errMessage = `Cannot find this username`;
                }
            } else {
                userData.status = 1;
                userData.errCode = 1;
                userData.errMessage = `This username does not exist`
            }
        } catch (e) {
            console.log(e);
            reject(e);
        }
    })
}

// Update password
const handleUserUpdatePassword = (res, req) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            const { prePassword, curPassword, confirmNewPassword } = req.body;
            consolog.log(token);
            let isExist = await checkUsername(username);
            if (isExist) {
                // Check if this person exist in the database or not
                let user = await db.ADM_User.findOne({
                    //attributes: ['ID_User', 'Username', 'Password'],
                    where: { Username: username },
                    //raw: true,
                })
                if (user) {
                    // Compare previous Password is correct or not
                    let compareOldPassword = bcrypt.compareSync(prePassword, user.Password);
                    if (!compareOldPassword) {
                        userData.status = 0;
                        userData.errCode = 0;
                        userData.errMessage = `Previous password is incorrect`
                    } else {
                        // Compare typed password to typed confirm password
                        if (prePassword !== curPassword) {
                            // Create payload for access token
                            let payload_token = {
                                username: username.Username,
                                expiresIn: process.env.JWT_TOKEN_LIFE
                            }
                            // Create update password token
                            let upd_pw_token = createJWT(payload_token);
                            //let refresh_token = createRefreshJWT(payload_refresh_token);
                            userData.status = 0;
                            userData.errCode = 0;
                            userData.errMessage = 'Update password succesfully';
                            userData.info = {
                                upd_pw_token: upd_pw_token,
                            }
                        } else {
                            userData.status = 1;
                            userData.errCode = 3;
                            userData.errMessage = 'Updated password must be different from the current password'
                        }
                        // Update password
                    }
                } else {
                    userData.status = 1;
                    userData.errCode = 2;
                    userData.errMessage = `Cannot find this username`;
                }
            } else {
                userData.status = 1;
                userData.errCode = 1;
                userData.errMessage = `This username does not exist`
            }
            resolve();
        } catch (e) {
            console.log(e);
            reject(e);
        }
    })
}

// check Username
let checkUsername = (userName) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.ADM_User.findOne({
                where: { Username: userName }
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

// Hash password
let hashUserPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}

module.exports = {
    handleUserLogin: handleUserLogin,
    handleUserRegister: handleUserRegister,
    handleUserForgotPassword: handleUserForgotPassword,
    handleUserUpdatePassword: handleUserUpdatePassword
}
