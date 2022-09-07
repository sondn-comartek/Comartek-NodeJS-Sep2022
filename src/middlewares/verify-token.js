const jwt = require("jsonwebtoken");
const CONSTANTS = require("../constants");
const UserRepository = require("../repositories/user.repo");

const verifyToken = async (req, res, next) => {
  const token = req.token || req.body.token;
  if (!token) {
    return res.status(404).json({ error: "Token is not provided" });
  }

  try {
    const decoded = jwt.verify(token, CONSTANTS.JwtSecret);
    if (decoded.email) {
      const user = await UserRepository.getUserByEmail(decoded.email);
      if (!user) {
        return res.stauts(400).json({ error: "Invalid token" });
      }
    }
  } catch (error) {
    return res.status(400).json({ error: "Invalid token" });
  }

  next();
};

module.exports = verifyToken;
