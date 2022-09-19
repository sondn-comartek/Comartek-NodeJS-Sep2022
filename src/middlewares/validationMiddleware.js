export const isValidEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const isValidPassword = (password) => {
    if (password.length < 8) {
        return false;
    }
    return true;
};

export const validateRegisterForm = (req, res, next) => {
    const { name, phone, email, password, passwordConfirm } = req.body;
    if (!name || !phone || !email || !password || !passwordConfirm) {
        res.status(400).json({ message: "Please fill the required information" });
    }
    if (!isValidEmail(email)) {
        res.status(400).json({ message: "Email is invalid" });
    }
    if (!isValidPassword(password)) {
        res.status(400).json({ message: "Password length should be greater than 8 character" });
    } else {
        next();
    }
};

export const validateLoginForm = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "Please fill the required information" });
    } else {
        next();
    }
};