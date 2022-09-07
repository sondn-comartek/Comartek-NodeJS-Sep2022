const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const express = require("express");
const app = express();

const userRouter = require("../routers/user.router");
const passwordRouter = require("../routers/password.router");

app.use(bodyParser.json());
app.use(morgan("common"));
app.use(cors({ origin: "*" }));

app.use("/api/users", userRouter);
app.use("/api/password", passwordRouter);

module.exports = app;
