import express from  'express' ;
import fetch from 'node-fetch';

const app = express();
const API = 'https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b1b15e88fa797225412429c1c50c122a1'

app.get('/' , async (req,res,next) => {
    try {
    const response = await fetch(API);
    const data = await response.json() ;
    res.status(200).json({
        cityName : data.name ,
        countryCode : data.cod ,
        date : data.dt ,
        weatherForecast: {
            description: data.weather.description,
            minimum : data.main.temp_min,
            maximum : data.main.temp_max,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed
        }
    })
    } catch(err){
        next(err)
    }
})

app.use( (err , req , res , next ) => {
    if(err) return res.status(404).json({
        success : false ,
        message : err
    })
} )

app.listen( 3000 , () => {
    console.log('app is listening at port 3000')
})