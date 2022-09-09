import express from "express";

import bodyParser from "body-parser";

import route from "../src/routers/route.js";

const app = express();

app.use(bodyParser.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

route(app);

export default app ;