const jwt = require("jsonwebtoken");
const CONSTANTS = require("../constants");
const UserRepository = require("../repositories/user.repo");

const TokenErrors = {
  NotProvided: "Token is not provided",
  Invalid: "Token is not valid",
};

const verifyToken = async (req, res, next) => {
  const token = req.token || req.body.token;
  if (!token) {
    return res.status(404).json({ error: TokenErrors.NotProvided });
  }

  try {
    const decoded = jwt.verify(token, CONSTANTS.JwtSecret);
    if (decoded.email) {
      const user = await UserRepository.getUserByEmail(decoded.email);
      if (!user) {
        return res.stauts(400).json({ error: TokenErrors.Invalid });
      }
    }
  } catch (error) {
    return res.status(400).json({ error: TokenErrors.Invalid });
  }

  next();
};

module.exports = verifyToken;
