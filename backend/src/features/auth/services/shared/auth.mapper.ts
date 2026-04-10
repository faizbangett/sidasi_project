import type { SafeUser, User } from "../../types/auth.types";

export function toSafeUser(user: User): SafeUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
