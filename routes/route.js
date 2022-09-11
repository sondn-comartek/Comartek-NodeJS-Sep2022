const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { validateRegisterForm, validateLoginForm } = require("../middlewares/validationMiddleware");
const AccountController = require("../controllers/AccountController");


router.post("/login", validateLoginForm, AccountController.login);
router.post("/register", validateRegisterForm, AccountController.register);
router.post("/change-password", authMiddleware.authMiddleware, AccountController.updatePassword);
router.post("/forgot-password", AccountController.forgotPassword);

module.exports = router;