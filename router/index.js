const express=require(`express`)
const router=express.Router()
const {nodetest,about,return_dirName,getFile,timeNow}=require(`../controller`)
router.get(`/nodetest`,nodetest)
router.get(`/about`,about)
router.get(`/_dirname`,return_dirName)
router.get(`/_dirname/:filename`,getFile)
router.get(`/timeNow`,timeNow)
module.exports=router