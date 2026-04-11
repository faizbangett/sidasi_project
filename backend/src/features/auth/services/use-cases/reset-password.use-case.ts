import {
  deleteResetToken,
  findResetToken,
  findUserByEmail,
  saveUser,
} from "../../repositories/auth.repository";
import { hashPassword, hashResetToken } from "../../security/auth.security";
import type {
  AuthSuccess,
  ResetPasswordPayload,
  ValidationErrors,
} from "../../types/auth.types";
import { getPasswordError } from "../../validators/auth.validation";
import { authError } from "../shared/auth.errors";

export async function resetPassword(
  payload: ResetPasswordPayload,
): Promise<AuthSuccess> {
  const normalizedToken = payload.token?.trim() ?? "";
  const hashedToken = normalizedToken ? hashResetToken(normalizedToken) : "";
  const normalizedNewPassword = payload.newPassword ?? "";

  const errors: ValidationErrors = {};
  if (!normalizedToken) {
    errors.token = "Token reset wajib diisi.";
  }

  const passwordError = getPasswordError(normalizedNewPassword);
  if (!normalizedNewPassword) {
    errors.newPassword = "Kata sandi baru wajib diisi.";
  } else if (passwordError) {
    errors.newPassword = passwordError;
  }

  if (Object.keys(errors).length > 0) {
    throw authError(400, "Periksa kembali data yang kamu isi.", errors);
  }

  const tokenData = await findResetToken(hashedToken);
  if (!tokenData || tokenData.expiresAt < Date.now()) {
    throw authError(400, "Token reset tidak valid atau sudah kedaluwarsa.");
  }

  const user = await findUserByEmail(tokenData.email);
  if (!user) {
    throw authError(400, "Token reset tidak valid atau sudah kedaluwarsa.");
  }

  await saveUser({
    ...user,
    passwordHash: hashPassword(normalizedNewPassword),
  });

  await deleteResetToken(hashedToken);

  return {
    status: 200,
    message: "Kata sandi berhasil diperbarui. Silakan login ulang.",
  };
}
