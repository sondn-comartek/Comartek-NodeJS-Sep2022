
import express from 'express';
import http from 'http';
import dotenv from "dotenv";
import { Server } from "socket.io";
dotenv.config();
import mongoose from 'mongoose';
const app = express();
import route from "./src/routes/route.js";
import { connection } from './src/services/SocketService.js';
import * as UserService from './src/services/UserService.js';
const server = http.createServer(app);
import jwt from "jsonwebtoken";
import User from './src/models/model.js';
const io = new Server(server);


app.use(express.json());
app.use("/account", route);
global._io = io;

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('chat', message => {
//     socket.emit('chat', "world");
//     console.log(message);
//   })
// });

// User middleware
global._io.use((socket, next) => {
  const { token } = socket.handshake.headers;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_CODE, async function(err, decoded) {
      if (err) console.log(err);
      const user = await UserService.getOneUser(decoded.email);
      if (user) {
        socket.data.username = user.name;
        return next();
      }
      next(new Error("Not authenticate"));
    });
  } else {
    next(new Error("Not authenticate"));
  }
})

global._io.on('connection', connection);

server.listen(3000, () => {
  console.log('listening on *:3000');
});


// Connect database
mongoose.connect(process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});