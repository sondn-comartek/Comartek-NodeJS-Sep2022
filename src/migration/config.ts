export default () => {
  process.env.TYPE = 'migration'
  process.env.DB = `${process.argv[2]}/${process.argv[3]}`
  process.env.JWT_SECRET = "giangdv@comartek.com",
  process.env.EXPIRED_IN = "3 days",

  process.env.TYPE = "migration"
  return {
    DB: process.argv[2] + "/" + process.argv[3],
    SALT_ROUND:"10",
  
    JWT_SECRET:"giangdv@comartek.com",
    EXPIRED_IN:"3 days",
  
    TYPE:"migration"
  
  }
}