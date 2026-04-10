import { findUserByEmail } from "../../repositories/auth.repository";
import {
  createAccessToken,
  hashPassword,
  verifyPassword,
} from "../../security/auth.security";
import type {
  AuthSuccess,
  LoginPayload,
  SafeUser,
} from "../../types/auth.types";
import { authError } from "../shared/auth.errors";
import { toSafeUser } from "../shared/auth.mapper";

export async function login(
  payload: LoginPayload,
): Promise<AuthSuccess<SafeUser>> {
  const normalizedEmail = payload.email?.trim().toLowerCase() ?? "";
  const normalizedPassword = payload.password ?? "";

  if (!normalizedEmail || !normalizedPassword) {
    throw authError(400, "Email dan kata sandi wajib diisi.");
  }

  const user = await findUserByEmail(normalizedEmail);
  if (!user || !verifyPassword(normalizedPassword, user.passwordHash)) {
    throw authError(401, "Email atau kata sandi tidak cocok.");
  }

  return {
    status: 200,
    message: "Login berhasil.",
    token: createAccessToken(user),
    data: toSafeUser(user),
  };
}
