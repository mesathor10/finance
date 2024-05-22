import express from "express";
import {
  Login,
  SignUp,
  ForgotPassword,
  ResetPassword,
  Logout,
  Notfi,
  FindUserData,
} from "../controller/authController.js";

const authRouter = express.Router();

authRouter.route("/login").post(Login);
authRouter.route("/signup").post(SignUp);
authRouter.route("/forgot").post(ForgotPassword);
authRouter.route("/reset/:token").post(ResetPassword);
authRouter.route("/notifi").post(Notfi);
authRouter.route("/userdata/:id").get(FindUserData);
authRouter.route("/logout").get(Logout);

export default authRouter;
