import authRouter from "./auth.router.js" ;
import errorHandlerMdw from "../middlewares/errorHandler.mdw.js"
export default function route(app) {
    app.use('/auth' , authRouter)
    app.use( errorHandlerMdw )
}