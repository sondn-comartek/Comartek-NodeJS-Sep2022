const jwt = require("jsonwebtoken");
const CONSTANTS = require("../constants");
const UserRepository = require("../repositories/user.repo");

const TokenErrors = {
  NotProvided: "Token chưa được cung cấp",
  Invalid: "Token không hợp lệ",
};

const verifyToken = async (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    return res.status(404).json({ error: TokenErrors.NotProvided });
  }

  try {
    const decoded = jwt.verify(token, CONSTANTS.JwtSecret);
    if (decoded?.userId) {
      const user = await UserRepository.getUserById(decoded?.userId);
      if (!user) {
        return res.stauts(400).json({ error: TokenErrors.Invalid });
      }

      req.userId = decoded.userId;
    }
  } catch (error) {
    return res.status(400).json({ error: TokenErrors.Invalid });
  }

  return next();
};

module.exports = verifyToken;
