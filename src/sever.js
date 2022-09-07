import express from "express";
import bodyParser from "body-parser";
import route from "./routers/route.js"

import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

route(app);
app.listen(PORT, () => {
  console.log(`sever is running at port :  ${PORT}`);
});
