import express from 'express';
const router = express.Router();
import * as authMiddleware from '../middlewares/authMiddleware.js';
import { validateRegisterForm, validateLoginForm } from '../middlewares/validationMiddleware.js';
import * as AccountController from '../controllers/AccountController.js';

router.get("/", (req, res) => {
    res.json({"Express": "ok"});
});
router.post("/login", validateLoginForm, AccountController.login);
router.post("/register", validateRegisterForm, AccountController.register);
router.post("/change-password", authMiddleware.authMiddleware, AccountController.updatePassword);
router.post("/forgot-password", AccountController.forgotPassword);

export default router;