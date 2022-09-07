import express from "express";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.post("/register", userController.handleRegister);
  router.get("/login", userController.handleLogin);
  router.get("/forgot-password", userController.handleForgotPassword);
  router.put("/update-password", userController.handleUpdatePassword);

  return app.use("/", router);
};

module.exports = initWebRoutes;
