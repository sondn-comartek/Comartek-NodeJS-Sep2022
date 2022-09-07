import express from "express";
import bodyParser from "body-parser";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";

require("dotenv").config();

let app = express();
app.use(cors({ origin: true }));

//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initWebRoutes(app);

connectDB();

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("backend nodejs is runing on the port " + port);
});
