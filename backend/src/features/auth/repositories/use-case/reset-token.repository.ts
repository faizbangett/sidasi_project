import { dbPool } from "../../../../config/db";

type ResetTokenRecord = {
  email: string;
  expiresAt: number;
};

export async function saveResetToken(token: string, payload: ResetTokenRecord) {
  await dbPool.query(
    `
      INSERT INTO password_reset_tokens (token, email, expires_at)
      VALUES ($1, $2, to_timestamp($3 / 1000.0))
      ON CONFLICT (token)
      DO UPDATE SET
        email = EXCLUDED.email,
        expires_at = EXCLUDED.expires_at
    `,
    [token, payload.email, payload.expiresAt],
  );
}

export async function deleteResetTokensByEmail(email: string) {
  await dbPool.query(
    `
      DELETE FROM password_reset_tokens
      WHERE email = $1
    `,
    [email],
  );
}

export async function findResetToken(token: string) {
  const result = await dbPool.query<{
    email: string;
    expires_at: Date;
  }>(
    `
      SELECT email, expires_at
      FROM password_reset_tokens
      WHERE token = $1
      LIMIT 1
    `,
    [token],
  );

  const row = result.rows[0];
  if (!row) return undefined;

  return {
    email: row.email,
    expiresAt: row.expires_at.getTime(),
  };
}

export async function deleteResetToken(token: string) {
  await dbPool.query(
    `
      DELETE FROM password_reset_tokens
      WHERE token = $1
    `,
    [token],
  );
}
