import { Router } from "express";
import {
  forgotPasswordController,
  loginController,
  meController,
  registerController,
  resetPasswordController,
} from "../controllers/auth.controller";
import {
  authForgotPasswordRateLimit,
  authLoginRateLimit,
  authRegisterRateLimit,
  authResetPasswordRateLimit,
} from "../middleware/auth.rate-limit";

export const authRouter = Router();

authRouter.post("/register", authRegisterRateLimit, registerController);
authRouter.post("/login", authLoginRateLimit, loginController);
authRouter.get("/me", meController);
authRouter.post(
  "/forgot-password",
  authForgotPasswordRateLimit,
  forgotPasswordController,
);
authRouter.post(
  "/reset-password",
  authResetPasswordRateLimit,
  resetPasswordController,
);
