import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
//import initWebRoutes from './route/web';
import initApiRoutes from './route/api';
import connectDB from "./config/connectDB";
import cors from "cors";
import cookieParser from "cookie-parser";
import configCors from "./config/cors";

require('dotenv').config();

let app = express();

//config cors
app.use(cors());
//xconfigCors(app);

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config cookie-parser
app.use(cookieParser());

//config view engine
viewEngine(app);

// init web routes
//initWebRoutes(app);
initApiRoutes(app);
app.get('/confirmation/updatePassword/', function (res, req) {
    res.redirect('https://localhost:8080/user/updatePassword');
})

//Connect db
connectDB();

let port = process.env.PORT || 6969;

app.use((req, res) => {
    return res.send('404 not found ')
})
app.listen(port, () => {
    //callback
    console.log("Running on the port number : " + port)
})
