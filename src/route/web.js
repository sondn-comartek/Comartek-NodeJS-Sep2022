import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

const initWebRoutes = (app) => {
  router.post("/register", userController.handleRegister);
  router.get("/login", userController.handleLogin);
  router.put("/forgot-password", userController.handleForgotPassword);
  router.put("/reset-password", userController.handleResetPassword);

  return app.use("/", router);
};

module.exports = initWebRoutes;
