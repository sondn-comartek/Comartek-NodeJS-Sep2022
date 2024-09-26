const bcrypt = require('bcrypt')
const User = require('./../model/Users')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.genToken = (id) => {
    console.log(process.env.JWT_SECRET)
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

exports.hashPassword = async (password) => {
    try {
        return await bcrypt.hash(password, 12)
    } catch (e) {
        return e
    }

}

exports.checkUserEmail = async (email) => {
    return await User.findOne({ email })
}

exports.signup = async (req, res) => {
    try {
        const users = await User.find()
        console.log(users)
        let { email, password, passwordConfirm } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const userTmp = await this.checkUserEmail(email)
        if (userTmp) {
            throw res.status(400).json({
                status: "Email has already existed"
            })
        }
        if (password !== passwordConfirm) {
            throw res.status(400).json({
                message: "Password must be match password confirm"
            })
        }
        password = await bcrypt.hash(password, 12)
        const user = await User.create({
            email,
            password
        })
        const access_token = await this.genToken(user.id)
        return res.status(200).json({
            access_token
        })
    } catch (err) {
        throw err
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const user = await this.checkUserEmail(email)
        const check = await bcrypt.compare(password, user.password)
        if (!user || !(check)) {
            return res.status(400).json({
                error: "Invalid email or password"
            })
        }
        const access_token = await this.genToken(user.id)
        return res.status(200).json({
            access_token
        })
    } catch (e) {
        throw e
    }
}

exports.changePassword = async (req, res) => {
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
        throw err
    }
}

exports.forgotPassword = async (req, res) => {
    try {
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
        const access_token = await this.genToken(user.id)
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
    } catch (err) {
        throw err
    }
}

