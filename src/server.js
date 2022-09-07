const http = require("http");
const app = require("./app");
const connectDatabase = require("./configs/database");
const CONSTANTS = require("./constants");
const { Port } = CONSTANTS;
const server = http.createServer(app);

async function main() {
  await connectDatabase();
  server.listen(Port, () => {
    console.log(`App running on port ${Port}`);
  });
}

main().catch((error) => console.log(error));
