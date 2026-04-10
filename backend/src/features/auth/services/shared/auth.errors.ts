import type { AuthError, ValidationErrors } from "../../types/auth.types";

export function authError(
  status: number,
  message: string,
  errors?: ValidationErrors,
): AuthError {
  if (errors) {
    return { status, message, errors };
  }

  return { status, message };
}
