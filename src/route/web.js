import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

const initWebRoutes = (app) => {
  router.post("/api/v1/auth/register", userController.handleRegister);
  router.get("/api/v1/auth/login", userController.handleLogin);
  router.put(
    "/api/v1/auth/forgot-password",
    userController.handleForgotPassword
  );
  router.put("/api/v1/auth/reset-password", userController.handleResetPassword);

  return app.use("/", router);
};

module.exports = initWebRoutes;
