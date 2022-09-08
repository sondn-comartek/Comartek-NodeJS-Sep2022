const { counter, counterAPI } = require("../controllers/christmas");

const router = require("express").Router();
router.get("/", (req, res) => {
  res.render("index");
});
router.get("/christmas", counter);
router.get("/api/v1/christmas", counterAPI);
module.exports = router;
