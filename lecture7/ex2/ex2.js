const https = require('https')
const http = require('http')

https.get('https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b1b15e88fa797225412429c1c50c122a1', (resp) => {
    let data

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        chunk = JSON.parse(chunk.toString())
        data = chunk
        // data += chunk.toString();
    });

    // The whole response has been received. Print out the result.

    resp.on('end', () => {
        weatherData = {
            CityName: 'London',
            CountryName: 'GB',
            DateTime: data?.dt,
            WeatherForecast: {
                Description: 'light intensity' + data.visibility.toString(),
                MinimumTemperature: data.main.temp_min,
                MaximumTemperature: data.main.temp_max,
                Humidity: data.main.humidity,
                WindSpeed: data.wind.speed
            }
        }
        const server = http.createServer((req, res) => {

            res.write(JSON.stringify(weatherData))
            res.end()
        })
        server.listen(3000)
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});

