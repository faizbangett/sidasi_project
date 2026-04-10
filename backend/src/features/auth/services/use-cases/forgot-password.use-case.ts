import { sendResetPasswordEmail } from "../../mailers/auth.mailer";
import {
  deleteResetTokensByEmail,
  findUserByEmail,
  saveResetToken,
} from "../../repositories/auth.repository";
import {
  buildResetPasswordUrl,
  createResetToken,
  hashResetToken,
} from "../../security/auth.security";
import type {
  AuthSuccess,
  ForgotPasswordPayload,
} from "../../types/auth.types";
import { isValidEmail } from "../../validators/auth.validation";
import { RESET_TOKEN_TTL_MS } from "../shared/auth.constants";
import { authError } from "../shared/auth.errors";

export async function forgotPassword(
  payload: ForgotPasswordPayload,
): Promise<AuthSuccess> {
  const normalizedEmail = payload.email?.trim().toLowerCase() ?? "";

  if (!normalizedEmail || !isValidEmail(normalizedEmail)) {
    throw authError(400, "Masukkan email yang valid.");
  }

  const user = await findUserByEmail(normalizedEmail);
  if (user) {
    await deleteResetTokensByEmail(normalizedEmail);

    const token = createResetToken();
    const tokenHash = hashResetToken(token);
    const resetUrl = buildResetPasswordUrl(token);

    await saveResetToken(tokenHash, {
      email: normalizedEmail,
      expiresAt: Date.now() + RESET_TOKEN_TTL_MS,
    });

    try {
      await sendResetPasswordEmail({
        to: normalizedEmail,
        name: user.name,
        resetUrl,
      });
    } catch (error) {
      await deleteResetTokensByEmail(normalizedEmail);
      console.error("[Auth] Gagal mengirim email reset password:", error);
      throw authError(
        500,
        "Gagal mengirim email reset password. Silakan coba lagi nanti.",
      );
    }
  }

  return {
    status: 200,
    message:
      "Jika email terdaftar, link reset kata sandi sudah kami kirim. Cek inbox kamu.",
  };
}
