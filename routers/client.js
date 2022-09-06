const router = require("express").Router();
const { register, login } = require("../controllers/user");
router.all("/", (req, res) => {
  res.json("hello world2");
});
router.post("/add/user", register);
router.post("/login", login);
module.exports = router;
