const express = require('express')
const axios = require('axios').default;

const PORT = process.env.PORT || 3000

const app = express()

app.get('/', async (req, res) => {
  try {
    const data = await axios.get('http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b1b15e88fa797225412429c1c50c122a1')
      .then(function (response) {
        // handle success
        return response.data;
      })
    const { name: cityName, cod: contryCode,
      weather: { 
          0: {
          description: description,
          } 
      },
      main: {
        temp_min: minTemp,
        temp_max: maxTemp,
        humidity: humidity
      },
      wind: {
        speed: windSpeed
      }
    } = data
    const dateTime = new Date().toString()
    return res.status(200).send(
      `
        <ul style = "list-style-type:none;">
          <li> City name: ${cityName} </li>
          <li> Country code: ${contryCode}</li>
          <li> Date time: ${dateTime} </li>
          <li> Weather forecast:
            <ul style="list-style-type:disc;"> 
              <li>Description : ${description} </li>
              <li>Minimum temperature: ${minTemp} </li>
              <li>Maximum temperature: ${maxTemp} </li>
              <li>Humidity: ${humidity} </li>
              <li>Wind speed: ${windSpeed} </li>
            </ul>
          </li>
        </ul>
      `
    )
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Error" })
  }
})



app.listen(PORT, (err) => {
  console.log(`Server runing on port ${PORT}`)
})