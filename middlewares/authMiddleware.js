const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        res.status(401).json({ message: "Authentication invalid" });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET_CODE, (err, decoded) => {
        if (err) {
            res.status(401).json({ error: err, message: "Authentication false" });
        } else {
            req.body.userId = decoded.userId;
            next();
        }
    });
}

module.exports = { authMiddleware };