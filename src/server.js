import express from "express";
import bodyParser from "body-parser";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();
app.use(cors({ origin: true }));

//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initWebRoutes(app);

connectDB();

const server = http.createServer(app);
const io = new Server(server);

io.use((socket, next) => {
  console.log("handshake first", socket.handshake.query.token);
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(
      socket.handshake.query.token,
      process.env.TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          console.log("Authentication error1");
          return next(new Error("Authentication error"));
        }
        socket.decoded = decoded;
        next();
      }
    );
  } else {
    next(new Error("Authentication error"));
  }
});
io.on("connection", (socket) => {
  // console.log("socket decode:", socket.decoded);
  console.log("a user connected");

  socket.on("join room", (room) => {
    socket.join(room);
    console.log("socket room: ", socket.rooms); // Set { <socket.id>, "room1" }
  });

  socket.on("chat message", (msg) => {
    const room = [...socket.rooms][1];
    io.to(room).emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("backend nodejs is runing on the port " + port);
});
