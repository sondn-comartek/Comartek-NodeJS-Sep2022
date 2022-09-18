const jwt = require("jsonwebtoken");
const CONSTANTS = require("../../constants");
const UserRepository = require("../../repositories/user.repo");

const TokenErrors = {
  NotProvided: "Token chưa được cung cấp",
  NotValid: "Token không hợp lệ",
};

const TokenNotProvidedError = new Error(TokenErrors.NotProvided);
const TokenNotValidError = new Error(TokenErrors.NotValid);

const verifyAccessToken = async (socket, next) => {
  const token = socket?.handshake?.query?.token;
  if (!token) {
    return next(TokenNotProvidedError);
  }

  try {
    const decoded = jwt.verify(token, CONSTANTS.JwtSecret);
    if (decoded?.userId) {
      const user = await UserRepository.getUserById(decoded.userId);
      if (!user) {
        return next(TokenNotValidError);
      }

      socket.userId = decoded.userId;
    }
  } catch (error) {
    return next(new Error(TokenErrors.NotValid));
  }

  return next();
};

module.exports = verifyAccessToken;
