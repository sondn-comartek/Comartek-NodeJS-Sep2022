import http from "node:http";

import app from './src/app.js';

import connectDb from "./src/databases/index.js";

import { env } from "./src/utils/constants.js";

const server = http.createServer(app);

const PORT = env.port || 8000;

connectDb();

server.listen( PORT, () => {
  
  console.log(`server is running at port :  ${PORT}`);

});