import express from "express";
const app = express();
const PORT = 3000;
app.use(express.json());

const weatherData = [
    {
        cityName: "London",
        countryCode: "GB",
        dateTime: "2022-10-05T14:48:00.000Z",
        wheatherForecast: {
            description: "high light intensity",
            minimumTemperature: 25,
            maximumTemperature: 32,
            humidity: "65%",
            windSpeed: "8km/h"
        }
    },
    {
        cityName: "Vietnam",
        countryCode: "VI",
        dateTime: "2022-9-08T12:48:00.000Z",
        wheatherForecast: {
            description: "medium light intensity",
            minimumTemperature: 23,
            maximumTemperature: 29,
            humidity: "86%",
            windSpeed: "5km/h"
        }
    },
    {
        cityName: "USA",
        countryCode: "US",
        dateTime: "2022-8-23T10:30:00.000Z",
        wheatherForecast: {
            description: "storm",
            minimumTemperature: 15,
            maximumTemperature: 25,
            humidity: "96%",
            windSpeed: "25km/h"
        }
    }
];

app.get("/data/3.0/weather/:location", function(req,res, next) {
    const location = req.params.location;
    for (let ele of weatherData) {
        if (ele.cityName.toLowerCase().localeCompare(location.toLowerCase()) == 0) {
            res.status(200).json({ data: ele })
        }
    }
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
