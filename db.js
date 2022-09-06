const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URI,{
  useUnifiedTopology: true,
});
const connection = client.connect();
module.exports = connection;
