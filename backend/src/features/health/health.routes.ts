import { Router } from "express";

export const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  res.json({
    message: "Backend SIDASI aktif.",
    routes: {
      register: "POST /auth/register",
      login: "POST /auth/login",
      me: "GET /auth/me",
      forgotPassword: "POST /auth/forgot-password",
      resetPassword: "POST /auth/reset-password",
    },
  });
});
