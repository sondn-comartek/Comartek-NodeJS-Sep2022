import express from "express" ;

import { forgotPwd , resetPwd , updatePwd } from "../controllers /pwd.controller.js"

const router = express.Router() ;

router.patch("/update" , updatePwd ) ;

router.get("/reset?:secret" , resetPwd ) ;

router.post("/forgot", forgotPwd ) ;

export default router ; 