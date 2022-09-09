export default function errorHandler(error, req, res, next){
  console.log(error);
  const errDeltail = error.err.toString();
  const statusCode = error.status || 400 
  error.message??="oops, something wrong here"
  return res.status(statusCode).json({
    success: false,
    error: errDeltail ,
    message : error.message 
  });
}
