const app = require("express")();
const httpServer = require("http").createServer(app);
const path = require("path");
const bodyParser = require("body-parser");
const clientRouter = require("./src/routers/client");
const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./src/views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(clientRouter);
app.use((req, res, next) => {
  return res.status(404).send("404 Error");
});
httpServer.listen(PORT, () => {
  console.log(`server is running in port ${PORT}`);
});
