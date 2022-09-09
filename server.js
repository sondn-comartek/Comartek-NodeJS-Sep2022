import http from "node:http"

import app from './src/app.js'

import constants from "./src/utils /constants.js"

const server = http.createServer(app)

const PORT = constants.port || 8000;

server.listen( PORT, () => {
  
  console.log(`server is running at port :  ${PORT}`);

});