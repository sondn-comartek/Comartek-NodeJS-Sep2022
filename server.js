import http from "node:http";

import app from "./src/app.js";

import connectDb from "./src/databases/index.js";

import { Server } from "socket.io";

import { env } from "./src/utils/constants.js";

import socketIoListener from './src/socket.io/index.js'

const PORT = env.port || 8000;

const server = http.createServer(app);

const io = new Server(server);

socketIoListener(io) ;

connectDb();

server.listen(PORT, () => {
  console.log(`server is running at port :  ${PORT}`);
});
