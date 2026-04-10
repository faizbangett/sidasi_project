import { findUserByEmail } from "../../repositories/auth.repository";
import { verifyAccessToken } from "../../security/auth.security";
import type { AuthSuccess, SafeUser } from "../../types/auth.types";
import { authError } from "../shared/auth.errors";
import { toSafeUser } from "../shared/auth.mapper";

export async function getCurrentUserByToken(
  token: string,
): Promise<AuthSuccess<SafeUser>> {
  try {
    const payload = verifyAccessToken(token);
    const email = typeof payload.email === "string" ? payload.email : "";
    const user = await findUserByEmail(email);

    if (!user) {
      throw authError(401, "Sesi tidak valid. Silakan login ulang.");
    }

    return {
      status: 200,
      message: "Sesi valid.",
      data: toSafeUser(user),
    };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      "message" in error
    ) {
      throw error;
    }

    throw authError(401, "Token tidak valid atau sudah kedaluwarsa.");
  }
}
