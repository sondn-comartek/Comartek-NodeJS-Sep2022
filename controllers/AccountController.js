const User = require("../models/model");
const OtherController = require("./OtherController");
const { isMatchPassword } = require("../middlewares/validationMiddleware");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AccountController {
    // Register
    async register(req, res, next) {
        try {
            const { name, phone, email, password, passwordConfirm, city } = req.body;
            const results = await User.findOne({ email });
            if (results) {
                return res.status(400).json({ message: "Email is used, choose another email to register" });
            }
            if (!isMatchPassword(password, passwordConfirm)) {
                res.status(400).json({ message: "Confirm password is not match" });
            } else {
                const hashedPassword = await bcrypt.hash(password, 8);
                // 8: The number of hashing password
                const newUser = new User({ name: name, phone: phone, email: email, password: hashedPassword, city: city, createdTime: Date.now() });
                await newUser.save();
                res.status(200).json(newUser);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // Login
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const results = await User.findOne({ email });
            if (!results) {
                return res.status(400).json({ message: "No user with this email" });
            }
            bcrypt.compare(password, results.password, function (error, response) {
                if (error) {
                    console.log(error);
                } else {
                    if (response == false) {
                        res.status(400).json({ message: "Password is incorrect" });
                    } else {
                        const token = jwt.sign({ userId: results._id, email: email }, process.env.JWT_SECRET_CODE, { expiresIn: '1h' });
                        res.status(200).json({ message: `Login successfully`, token: token });
                    }
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }

    }

    // Forgot password
    async forgotPassword(req, res) {
        try {
            const email = req.body.email;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "No user with this email" });
            } else {
                const token = jwt.sign({ userId: user._id, email: email }, process.env.JWT_SECRET_CODE, { expiresIn: '3d' });
                const link = req.protocol + '://' + req.get('host') + req.originalUrl + "/" + token;
                const sendEmail = OtherController.sendEmail(email, link);
                console.log(sendEmail)
                if (sendEmail == true) {
                    res.status(200).json({ message: "The reset link has been sent to you" });
                } else {
                    res.status(500).json({ message: "Something goes to wrong. Please try again" });
                }
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // Change password
    async updatePassword(req, res, next) {
        try {
            const { oldPassword, newPassword, confirmNewPassword } = req.body;
            const userId = req.body.userId;
            const user = await User.findOne({ _id: userId });
            bcrypt.compare(oldPassword, user.password, async (error, response) => {
                if (error) {
                    res.status(500).json(error);
                }
                if (response == false) {
                    res.status(400).json({ message: "Old password is incorrect" });
                } else {
                    if (!isMatchPassword(newPassword, confirmNewPassword)) {
                        res.status(400).json({ message: "Confirm new password is not match" });
                    } else {
                        const hashedNewPassword = await bcrypt.hash(newPassword, 8);
                        await User.where({ _id: userId }).updateOne({ password: hashedNewPassword });
                        res.status(200).json({ message: "Change password successfully" })
                    }
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = new AccountController; 