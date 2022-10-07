export default () => {
  return {
    DB: process.argv[2] + "/" + process.argv[3],
    SALT_ROUND:"10",
  
    JWT_SECRET:"giangdv@comartek.com",
    EXPIRED_IN:"3 days",
  
    TYPE:"migration"
  
  }
}