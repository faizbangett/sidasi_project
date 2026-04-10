import crypto from "node:crypto";
import { findUserByEmail, saveUser } from "../../repositories/auth.repository";
import { hashPassword } from "../../security/auth.security";
import type {
  AuthSuccess,
  RegisterPayload,
  ValidationErrors,
} from "../../types/auth.types";
import {
  getPasswordError,
  isValidEmail,
} from "../../validators/auth.validation";
import { authError } from "../shared/auth.errors";

export async function register(payload: RegisterPayload): Promise<AuthSuccess> {
  const normalizedName = payload.name?.trim() ?? "";
  const normalizedEmail = payload.email?.trim().toLowerCase() ?? "";
  const normalizedPassword = payload.password ?? "";
  const normalizedConfirmPassword = payload.confirmPassword ?? "";

  const errors: ValidationErrors = {};

  if (!normalizedName) {
    errors.name = "Nama wajib diisi.";
  }

  if (!normalizedEmail) {
    errors.email = "Email wajib diisi.";
  } else if (!isValidEmail(normalizedEmail)) {
    errors.email = "Format email belum valid.";
  }

  const passwordError = getPasswordError(normalizedPassword);
  if (!normalizedPassword) {
    errors.password = "Kata sandi wajib diisi.";
  } else if (passwordError) {
    errors.password = passwordError;
  }

  if (!normalizedConfirmPassword) {
    errors.confirmPassword = "Konfirmasi kata sandi wajib diisi.";
  } else if (normalizedConfirmPassword !== normalizedPassword) {
    errors.confirmPassword = "Konfirmasi kata sandi tidak sama.";
  }

  if (Object.keys(errors).length > 0) {
    throw authError(400, "Periksa kembali data yang kamu isi.", errors);
  }

  if (await findUserByEmail(normalizedEmail)) {
    throw authError(
      409,
      "Email ini sudah terdaftar. Coba login atau pakai email lain.",
    );
  }

  await saveUser({
    id: crypto.randomUUID(),
    name: normalizedName,
    email: normalizedEmail,
    passwordHash: hashPassword(normalizedPassword),
  });

  return {
    status: 201,
    message: "Akun berhasil dibuat. Silakan login.",
  };
}
