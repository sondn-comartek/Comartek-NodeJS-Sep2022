const express=require(`express`)
const router=express.Router()
const auth=require(`../middleware/authentication`)
const {getAllMemberOnline,chatAll,chatPrivate}=require(`../controller/chatApp`)
router.route(`/allMemberOnline`).get(auth,getAllMemberOnline)
router.route(`/chat`).get(auth,chatAll)
router.route(`/chat/:id`).get(auth,chatPrivate)

module.exports=router