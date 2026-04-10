import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import type { User } from "../types/auth.types";
import { FRONTEND_ORIGIN } from "../../../config/env";

const JWT_SECRET = process.env.JWT_SECRET ?? "sidasi-dev-secret";
const JWT_EXPIRES_IN = "1h";
const BCRYPT_SALT_ROUNDS = 10;

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);
}

export function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compareSync(password, passwordHash);
}

export function createAccessToken(user: User) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  );
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

export function createResetToken() {
  return crypto.randomBytes(24).toString("hex");
}

export function hashResetToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function buildResetPasswordUrl(token: string) {
  const resetUrl = new URL("/", FRONTEND_ORIGIN);
  resetUrl.searchParams.set("resetToken", token);
  return resetUrl.toString();
}
