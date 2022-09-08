const { counter, counterAPI } = require("../controllers/christmas");
const { nodejsfresher, about, nodejstest } = require("../controllers/url");

const router = require("express").Router();
router.get("/", (req, res) => {
  res.render("index");
});
router.get("/christmas", counter);
router.get("/api/v1/christmas", counterAPI);
router.get("/nodejsfresher", nodejsfresher);
router.get("/about", about);
router.get("/nodejstest", nodejstest);
module.exports = router;
