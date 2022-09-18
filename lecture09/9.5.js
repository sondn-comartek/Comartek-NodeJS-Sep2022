const API_URL =
  "http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b1b15e88fa797225412429c1c50c122a1";
const fetch = require("request-promise");
const http = require("http");

const PORT = 8000;

async function getDataFromApi() {
  const options = {
    method: "GET",
    json: true,
  };

  const data = await fetch(API_URL, options);
  return data;
}

const server = http.createServer(async (req, res) => {
  const data = await getDataFromApi();
  const response = JSON.stringify(data);
  res.end(response);
});

server.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Example app running on port ${PORT}`);
});
