const CustomError = require("./custom_error");
const { StatusCodes } = require("http-status-codes");
class AuthenticationError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
module.exports = AuthenticationError;
