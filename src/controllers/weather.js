const axios = require("axios").default;
const callWeatherInfo = (req, res) => {
  axios
    .get(process.env.URL_WEATHER)
    .then((result) => {
      const data = result["data"];
      return res.render("index", {
        name: data["name"],
        country_code: data["sys"]["country"],
        date_time: data["dt"],
        weather: {
          description: data["weather"]["description"],
          temp_min: data["main"]["temp_min"],
          temp_max: data["main"]["temp_max"],
          humidity: data["main"]["humidity"],
          wind: data["wind"]["speed"],
        },
      });
    })
    .catch((err) => {
      return res.send(err);
    });
};
module.exports = { callWeatherInfo };
