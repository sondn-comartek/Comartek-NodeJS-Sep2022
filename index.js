const app = require("express")();
const bodyParser = require("body-parser");
const clientRouter = require("./routers/client");
const connectDB = require("./database/connectDB");
const PORT = process.env.PORT || 8000;
const httpServer = require("http").createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/v1", clientRouter);
httpServer.listen(PORT, () => {
  connectDB();
  console.log(`server is running ${PORT}`);
});
