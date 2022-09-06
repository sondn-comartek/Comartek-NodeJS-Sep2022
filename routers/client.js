const router = require("express").Router();
const { register, login, forgotPassword } = require("../controllers/user");
router.all("/", (req, res) => {
  res.json("hello world2");
});
router.post("/add/user", register);
router.post("/login", login);
router.post('/forgot', forgotPassword)
module.exports = router;
