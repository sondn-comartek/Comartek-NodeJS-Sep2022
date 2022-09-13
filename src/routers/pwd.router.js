import express from "express" ;

import { forgotPwd , resetPwd , updatePwd } from "../controllers/pwd.controller.js"
import { appAuthentication } from "../middlewares/authentication.mdw.js";

const router = express.Router() ;

router.patch("/update" , appAuthentication ,  updatePwd ) ;

router.get("/reset?:secret" , resetPwd ) ;

router.post("/forgot", forgotPwd ) ;

export default router ; 