const notFound=(req,res,next)=> res.status(404).send(`Can't find you web`)
module.exports=notFound