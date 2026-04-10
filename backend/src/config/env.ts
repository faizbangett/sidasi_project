export const FRONTEND_ORIGIN =
  process.env.FRONTEND_ORIGIN ?? "http://localhost:5173";
export const PORT = Number(process.env.PORT ?? 5000);

export const DATABASE_URL =
  process.env.DATABASE_URL ??
  "postgresql://postgres:postgres@localhost:5433/sidasi_db";

export const SMTP_HOST = process.env.SMTP_HOST ?? "";
export const SMTP_PORT = Number(process.env.SMTP_PORT ?? 587);
export const SMTP_USER = process.env.SMTP_USER ?? "";
export const SMTP_PASS = process.env.SMTP_PASS ?? "";
export const SMTP_FROM = process.env.SMTP_FROM ?? SMTP_USER;
export const SMTP_SECURE = process.env.SMTP_SECURE === "true";
export const NODE_ENV = process.env.NODE_ENV ?? "development";

function isPlaceholderValue(key: string, value: string | undefined) {
  if (!value) return true;

  const placeholders: Record<string, string[]> = {
    JWT_SECRET: [
      "sidasi-dev-secret",
      "replace_with_long_random_secret_min_32_chars",
    ],
    SMTP_USER: ["your_email@gmail.com"],
    SMTP_PASS: ["your_app_password"],
    SMTP_FROM: ["SIDASI <your_email@gmail.com>"],
  };

  const keyPlaceholders = placeholders[key] ?? [];
  return keyPlaceholders.includes(value.trim());
}

export function validateEnv() {
  const requiredValues: Array<[string, string | undefined]> = [
    ["JWT_SECRET", process.env.JWT_SECRET],
    ["DATABASE_URL", process.env.DATABASE_URL],
    ["FRONTEND_ORIGIN", process.env.FRONTEND_ORIGIN],
  ];

  if (NODE_ENV === "production") {
    requiredValues.push(
      ["SMTP_HOST", process.env.SMTP_HOST],
      ["SMTP_USER", process.env.SMTP_USER],
      ["SMTP_PASS", process.env.SMTP_PASS],
      ["SMTP_FROM", process.env.SMTP_FROM],
    );
  }

  const missingValues = requiredValues
    .filter(([key, value]) => isPlaceholderValue(key, value))
    .map(([key]) => key);

  if (missingValues.length > 0) {
    throw new Error(
      `Environment belum lengkap. Lengkapi: ${missingValues.join(", ")}`,
    );
  }
}
