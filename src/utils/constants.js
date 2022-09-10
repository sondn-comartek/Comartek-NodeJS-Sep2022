import dotenv from "dotenv";

dotenv.config();

const constants = {
    port : process.env.PORT = 3000  ,
    accessTokenSecret : process.env.ACCESS_TOKEN_SECRET  ,
    refreshTokenSecret : process.env.REFRESH_TOKEN_SECRET ,
    salt : process.env.SALT_ROUND ,
    mailerUser : process.env.MAILER_USER ,
    mailerPwd : process.env.MAILER_PASSWORD ,
    hostUrl : process.env.HOST_URL
}
export default constants ;