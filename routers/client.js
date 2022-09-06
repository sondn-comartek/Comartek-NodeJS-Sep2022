const router = require("express").Router();
const { body } = require("express-validator");
const {
  register,
  login,
  forgotPassword,
  changePassword,
} = require("../controllers/user");
const auth = require("../middleware/auth");
const { handleValidate } = require("../middleware/handleError");
router.all("/", (req, res) => {
  middleware;
  res.json("hello world2");
});
router.post(
  "/add/user",
  body("email").isEmail(),
  body("password").isLength(8),
  handleValidate,
  register
);
router.post("/login", login);
router.post("/forgot", forgotPassword);
router.put("/change", auth, changePassword);
module.exports = router;
