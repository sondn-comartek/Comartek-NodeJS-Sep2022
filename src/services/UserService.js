import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
import User from '../models/model.js';

export const hashPassword = async (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

export const generateToken = (userId, email) => {
    return jwt.sign({ userId: userId, email: email }, process.env.JWT_SECRET_CODE, { expiresIn: '1h' });
};

export const isMatchPassword = (password, passwordConfirm) => {
    if (password != passwordConfirm) {
        return false;
    }
    return true;
}

export const getOneUser = async (email) => {
    const user = await User.findOne({ email });
    return user;
}