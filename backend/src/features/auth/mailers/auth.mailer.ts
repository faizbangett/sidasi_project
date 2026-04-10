import nodemailer from "nodemailer";
import {
  SMTP_FROM,
  SMTP_HOST,
  SMTP_PASS,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
} from "../../../config/env";

type SendResetPasswordEmailParams = {
  to: string;
  name: string;
  resetUrl: string;
};

function assertSmtpConfig() {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
    throw new Error(
      "Konfigurasi SMTP belum lengkap. Isi SMTP_HOST, SMTP_USER, SMTP_PASS, dan SMTP_FROM di file .env.",
    );
  }
}

function createTransporter() {
  assertSmtpConfig();

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

export async function sendResetPasswordEmail({
  to,
  name,
  resetUrl,
}: SendResetPasswordEmailParams) {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: SMTP_FROM,
    to,
    subject: "SIDASI - Reset Kata Sandi",
    text: [
      `Halo ${name},`,
      "",
      "Kami menerima permintaan reset kata sandi untuk akun SIDASI kamu.",
      "Klik link berikut untuk reset kata sandi:",
      "",
      resetUrl,
      "",
      "Token ini berlaku selama 10 menit.",
      "Abaikan email ini jika kamu tidak meminta reset kata sandi.",
    ].join("\n"),
    html: `
      <p>Halo <strong>${name}</strong>,</p>
      <p>Kami menerima permintaan reset kata sandi untuk akun SIDASI kamu.</p>
      <p>Klik link berikut untuk reset kata sandi:</p>
      <p><a href="${resetUrl}">${resetUrl}</a></p>
      <p>Token ini berlaku selama 10 menit.</p>
      <p>Abaikan email ini jika kamu tidak meminta reset kata sandi.</p>
    `,
  });
}
