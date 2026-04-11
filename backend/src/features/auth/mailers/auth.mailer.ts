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

const TRANSIENT_SMTP_ERRORS = new Set([
  "ETIMEDOUT",
  "ECONNECTION",
  "ESOCKET",
  "EENVELOPE",
]);

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sendMailWithRetry(
  transporter: nodemailer.Transporter,
  mailOptions: nodemailer.SendMailOptions,
) {
  const attempts = 2;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      await transporter.sendMail(mailOptions);
      return;
    } catch (error) {
      const code = (error as NodeJS.ErrnoException)?.code;
      const isTransient = !!code && TRANSIENT_SMTP_ERRORS.has(code);
      const isLastAttempt = attempt === attempts;

      if (!isTransient || isLastAttempt) {
        throw error;
      }

      await delay(400);
    }
  }
}

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

  await sendMailWithRetry(transporter, {
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
      <div style="background:#f3f7f6;padding:24px;font-family:'Segoe UI',Arial,sans-serif;color:#1f2937;">
        <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #d7e6e3;border-radius:14px;overflow:hidden;">
          <div style="padding:20px 24px;background:#0f766e;color:#ffffff;">
            <h1 style="margin:0;font-size:18px;line-height:1.4;">SIDASI - Permintaan Reset Kata Sandi</h1>
          </div>
          <div style="padding:24px;">
            <p style="margin:0 0 12px 0;">Halo <strong>${name}</strong>,</p>
            <p style="margin:0 0 14px 0;line-height:1.6;">
              Kami menerima permintaan untuk mengatur ulang kata sandi akun kamu.
              Klik tombol berikut untuk melanjutkan proses reset.
            </p>
            <p style="margin:20px 0;">
              <a href="${resetUrl}" style="display:inline-block;background:#0f766e;color:#ffffff;text-decoration:none;padding:12px 18px;border-radius:10px;font-weight:600;">
                Reset Kata Sandi
              </a>
            </p>
            <p style="margin:0 0 10px 0;line-height:1.6;">Link berlaku selama <strong>10 menit</strong>.</p>
            <p style="margin:0;line-height:1.6;font-size:13px;color:#4b5563;word-break:break-all;">
              Jika tombol tidak berfungsi, salin link ini ke browser:<br />
              <a href="${resetUrl}" style="color:#0f766e;">${resetUrl}</a>
            </p>
          </div>
          <div style="padding:16px 24px;background:#f8fafc;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px;line-height:1.5;">
            Jika kamu tidak meminta reset kata sandi, abaikan email ini.
          </div>
        </div>
      </div>
    `,
  });
}
