const route = require('express').Router()
const { signup, login, changePassword, forgotPassword } = require('./../service/service')
const { body } = require('express-validator')
route.post('/register',
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('passwordConfirm').isLength({ min: 5 })
    , signup)

route.post('/login',
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
    , login)

route.patch('/changePassword/:token',
    body('newPassword').isLength({ min: 5 }), changePassword
)

route.post('/fogotpassword',
    body('email').isEmail(), forgotPassword)

module.exports = route