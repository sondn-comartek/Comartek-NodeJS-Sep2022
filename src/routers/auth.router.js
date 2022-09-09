import express from "express" ;

import { register, login, forgotPwd, resetPwd, updatePwd } from "../controllers /auth.controller.js"

const router = express.Router() ;

router.patch("/updatePwd" , updatePwd ) ;

router.get("/resetPwd?:secret" , resetPwd ) ;

router.post("/login" , login ) ;

router.post("/forgotPwd", forgotPwd ) ;

router.post("/register" , register ) ;

export default router ; 