import messages from "../utils/messages.js";
export default function errorHandler(error, req, res, next){
  console.log(error);
  const errDeltail = error.err.toString();
  const statusCode = error.status || 400 
  error.message??=messages.somethingFail
  return res.status(statusCode).json({
    success: false,
    error: errDeltail ,
    message : error.message 
  });
}
