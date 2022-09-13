import authRouter from "./auth.router.js" ;

import pwdRouter from "./pwd.router.js" ;

import conversationRouter from "./conversation.router.js" ;

import errorHandlerMdw from "../middlewares/errorHandler.mdw.js"

import { appAuthentication } from "../middlewares/authentication.mdw.js";

export default function route(app) {

    app.use('/auth' , authRouter )

    app.use('/password' , pwdRouter )

    app.use('/conversation' , appAuthentication , conversationRouter )
    
    app.use( errorHandlerMdw )

}