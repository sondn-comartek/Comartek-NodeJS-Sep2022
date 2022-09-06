const jwt = require("jsonwebtoken");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const auth = async (req, res, next) => {
  let changeInfo = req.body;
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: ReasonPhrases.UNAUTHORIZED });
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, "key");
    // attach the user to the job routes
    res.locals.user = { id: payload.id, ...changeInfo };
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: ReasonPhrases.UNAUTHORIZED });
  }
};

module.exports = auth;
