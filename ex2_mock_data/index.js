import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors({ origin: true }));

//Config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const urlAPI = `http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b1b15e88fa797225412429c1c50c122a1`;

app.get("/", (req, res) => {
  axios
    .get(urlAPI)
    .then((response) => {
      console.log(`statusCode: ${res.status}`);
      console.log(response.data);
      const data = response.data;
      const date = new Date();
      return res.write(`<html><p> City name: ${data.name}</p>
    <p>Country code: ${data.sys.country}</p>
    <p>Date time: ${date}</p>
    <p>Weather forecast:</p>
    <ul>
      <li>Description: ${data.weather[0].description}</li>
      <li>Maximum temperature: ${data.main.temp_max}</li>
      <li>Humidity: ${data.main.humidity}</li>
      <li>Wind speed: ${data.wind.speed}</li>
    </ul></html>`);
    })
    .catch((error) => {
      console.error(error);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Backend nodejs is runing on the port " + port);
});
