// const path = require("path");
// const { writeFiles } = require("./src/controllers/trans_content");
// let outputFolder = path.resolve("./public/output/output.txt");
// writeFiles(outputFolder).then((data) => console.log(data));
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const app = require("express")();
const httpServer = require("http").createServer(app);
const clientRouter = require("./src/routers/client");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "./src/views"));

// app.use(express.static(__dirname + "../public"));
app.set("view engine", "ejs");
app.use("/", clientRouter);

const PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () => {
  console.log(`server is running in port ${PORT}`);
});
