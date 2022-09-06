const router = require("express").Router();
const { register } = require("../controllers/user");
router.all("/", (req, res) => {
  res.json("hello world2");
});
router.post("/add/user", register);
module.exports = router;
