const route = require('express').Router()
const fs = require('fs')
const bcrypt = require('bcrypt')
const User = require('../model/Users')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const { body, validationResult } = require('express-validator');
const genToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}


route.post('/register',
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('passwordConfirm').isLength({ min: 5 })
    , async (req, res) => {
        try {
            let { email, password, passwordConfirm } = req.body
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const userTmp = await User.findOne({ email })
            if (userTmp) {
                return res.status(400).json({
                    status: "Email has already existed"
                })
            }
            if (password !== passwordConfirm) {
                return res.json({
                    message: "Password must be match password confirm"
                })
            }
            password = await bcrypt.hash(password, 12)
            const user = await User.create({
                email,
                password
            })
            const access_token = await genToken(user.id)
            return res.json({
                access_token
            })
        } catch (err) {
            console.log(err)
        }
    })

route.post('/login',
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
    , async (req, res) => {
        const { email, password } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const user = await User.findOne({ email })
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({
                error: "Invalid email or password"
            })
        }
        const access_token = await genToken(user.id)
        return res.status(200).json({
            access_token
        })
    })

route.patch('/changePassword/:token',
    body('newPassword').isLength({ min: 5 }),
    async (req, res) => {
        try {
            let token = req.params.token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById(decoded.id)
            if (!user) {
                res.status(400).json({
                    mess: "Invalid token"
                })
            }
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            let { newPassword } = req.body
            newPassword = await bcrypt.hashSync(newPassword, 12)
            await User.findByIdAndUpdate(user.id, { password: newPassword })
            return res.status(200).json({
                mess: "success"
            })
        } catch (err) {
            console.log(err)
        }
    })

route.post('/fogotpassword',
    body('email').isEmail()
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const email = req.body.email
        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({
                status: "User doesn't exist"
            })
        }
        const access_token = genToken(user.id)
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mrflooo.1230@gmail.com',
                pass: 'sjyjgfaplmrrvxou'
            }
        });
        let mailOptions = {
            from: 'mrflooo.1230@gmail.com',
            to: email,
            subject: 'Your Password Change Link',
            html: `<a href="${process.env.CLIENT_URL}/changePassword/${access_token}"> click here </a>`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return res.status(200).json({
            status: "Success"
        })
    })

module.exports = route