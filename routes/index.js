const chatApp=require(`./chatAppRoute`)
const login=require(`./loginRoute`)

const router=require(`express`)()
router.use(`/login`,login)
router.use(`/chatApp`,chatApp)

module.exports=router