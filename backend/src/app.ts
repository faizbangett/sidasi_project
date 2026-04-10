import express from "express";
import cors from "cors";
import { FRONTEND_ORIGIN } from "./config/env";
import { authRouter } from "./features/auth/routes/auth.routes";
import { healthRouter } from "./features/health/health.routes";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: FRONTEND_ORIGIN,
    }),
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(healthRouter);
  app.use("/auth", authRouter);

  return app;
}
