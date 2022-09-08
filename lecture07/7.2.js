const API_URL =
  "http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b1b15e88fa797225412429c1c50c122a1";
const http = require("http");
const fetch = require("node-fetch");

const port = 3000;
const host = "localhost";

async function getDataFromApi() {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data;
}

/*
  City name: London
  Country code: GB
  Date time: ...
  Weather forecast:
  ● Description: light intensity …
  ● Minimum temperature: …
  ● Maximum temperature: …
  ● Humidity: …
  ● Wind speed: ..
*/

const server = http.createServer(async (req, res) => {
  const data = await getDataFromApi();
  console.log({ data });
  const responseData = {
    City: data?.name,
    CountryCode: data?.sys?.country,
    Datetime: new Date(),
  };
  res.end(JSON.stringify(responseData));
});

server.listen(port, host, () => {
  console.log(`App running on port ${port}`);
});
