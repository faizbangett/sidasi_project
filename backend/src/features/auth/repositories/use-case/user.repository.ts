import { dbPool } from "../../../../config/db";
import type { User } from "../../types/auth.types";

type UserRow = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
};

function mapUserRow(row: UserRow): User {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    passwordHash: row.password_hash,
  };
}

export async function findUserByEmail(email: string) {
  const result = await dbPool.query<UserRow>(
    `
      SELECT id, name, email, password_hash
      FROM users
      WHERE email = $1
      LIMIT 1
    `,
    [email],
  );

  const row = result.rows[0];
  return row ? mapUserRow(row) : undefined;
}

export async function saveUser(user: User) {
  await dbPool.query(
    `
      INSERT INTO users (id, name, email, password_hash)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (email)
      DO UPDATE SET
        id = EXCLUDED.id,
        name = EXCLUDED.name,
        password_hash = EXCLUDED.password_hash,
        updated_at = NOW()
    `,
    [user.id, user.name, user.email, user.passwordHash],
  );
}
