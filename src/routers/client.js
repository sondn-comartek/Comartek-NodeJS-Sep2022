const { converter, processConvert } = require("../controllers/convert");
const { callWeatherInfo } = require("../controllers/weather");
const router = require("express").Router();
router.get("/", callWeatherInfo);
router.get("/convert", converter);
router.post("/process/convert", processConvert);
module.exports = router;
