const route = require('express').Router()
const fs = require('fs')
const bcrypt = require('bcrypt')
const User = require('./Users')
const jwt = require('jsonwebtoken')
const { castObject } = require('./Users')
const genToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}


route.post('/register', async (req, res) => {
    try {
        let { email, password, passwordConfirm } = req.body
        if (password !== passwordConfirm) {
            return res.json({
                message: "Password must be match password confirm"
            })
        }
        let hashPassword = await bcrypt.hashSync(password, 12)
        passwordConfirm = hashPassword
        const user = await User.create({
            email,
            password: hashPassword,
            passwordConfirm
        })
        console.log(user)
        const access_token = await genToken(user.id)
        return res.json({
            access_token
        })
    } catch (err) {
        console.log(err)
    }
})

route.post('/login', async (req, res) => {
    const { email, password } = req.body
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

route.patch('/changePassword',
    async (req, res, next) => {
        try {
            let token
            if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
                token = req.headers.authorization.split(' ')[1]
            }
            if (!token) {
                return res.status(400).json({
                    mess: "Please login"
                })
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById(decoded.id)
            if (!user) {
                res.status(400).json({
                    mess: "Invalid token"
                })
            }
            req.user = user
            next()
        } catch (err) {
            console.log(err)
        }
    }, async (req, res) => {
        try {
            const { password, passwordConfirm, newPassword } = req.body
            if (password !== passwordConfirm) {
                return res.json({
                    message: "Password must be match password confirm"
                })
            }
            if (await bcrypt.compare(password, req.user.password)) {
                await User.findByIdAndUpdate(req.user.id, { password: newPassword })
                return res.status(200).json({
                    mess: "success"
                })
            }
            else {
                return res.status(400).json({
                    mess: "Invalid Password"
                })
            }
        } catch (err) {
            console.log(err)
        }
    })

module.exports = route