import { rateLimit } from "express-rate-limit";

export const authRegisterRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message:
      "Terlalu banyak percobaan daftar. Silakan coba lagi beberapa saat.",
  },
});

export const authLoginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Terlalu banyak percobaan login. Silakan coba lagi beberapa saat.",
  },
});

export const authForgotPasswordRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message:
      "Terlalu banyak permintaan reset password. Silakan coba lagi nanti.",
  },
});

export const authResetPasswordRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message:
      "Terlalu banyak percobaan reset password. Silakan coba lagi nanti.",
  },
});
