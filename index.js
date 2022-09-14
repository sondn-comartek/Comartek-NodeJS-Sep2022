require("dotenv").config();
const app = require("express")();
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const clientRouter = require("./routers/client");
const connectDB = require("./database/connectDB");
const { verifyToken } = require("./services/userServices");
const PORT = process.env.PORT || 8000;
const httpServer = require("http").createServer(app);
const io = new Server(httpServer);

io.use((socket, next) => {
  const token = socket.handshake.headers.auth;
  if (token) {
    next();
  } else {
    throw Error("unauthorized");
  }
});
io.on("connection", (socket) => {
  socket.on("chatting", (msg) => {
    io.emit("chatting", msg);
  });
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/v1", clientRouter);
httpServer.listen(PORT, () => {
  connectDB(process.env.URL);
  console.log(`server is running ${PORT}`);
});
