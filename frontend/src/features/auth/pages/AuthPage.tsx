import { useEffect } from "react";
import { AuthForms } from "../components/AuthForms";
import { AuthTabs } from "../components/AuthTabs";
import { useAuthFlow } from "../hooks/useAuthFlow";
import type { AuthSession } from "../types/auth.types";
import "../styles/auth-page.css";

type AuthPageProps = {
  onLoginSuccess?: (session: AuthSession) => void;
};

export function AuthPage({ onLoginSuccess }: AuthPageProps) {
  const auth = useAuthFlow({ onLoginSuccess });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const resetToken = searchParams.get("resetToken");

    if (resetToken) {
      auth.onTabChange("reset");
      auth.setResetForm((prev) => ({
        ...prev,
        token: resetToken,
      }));

      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [auth]);

  return (
    <main className="auth-page">
      <section className="brand-panel">
        <p className="kicker">Proposal Tugas Akhir</p>
        <h1>Validasi format laporan TA secara otomatis dan terukur.</h1>
        <p className="lead">
          Sistem ini dirancang untuk memeriksa kesesuaian format dokumen PDF
          berdasarkan pedoman KTI POLIJE menggunakan Rule-Based System dan
          ekstraksi properti visual.
        </p>

        <div className="signal-board" aria-label="Sorotan produk">
          <article>
            <p>01</p>
            <strong>Aturan berbasis pedoman</strong>
            <span>Rule memeriksa format sesuai standar KTI.</span>
          </article>
          <article>
            <p>02</p>
            <strong>Ekstraksi visual PDF</strong>
            <span>Koordinat, font, dan spasi dianalisis otomatis.</span>
          </article>
          <article>
            <p>03</p>
            <strong>Evaluasi terukur</strong>
            <span>Akurasi dianalisis memakai confusion matrix.</span>
          </article>
        </div>

        <div className="timeline-card">
          <div>
            <p className="hero-note-label">Alur Sistem</p>
            <h2>Tahap validasi dokumen</h2>
          </div>
          <ol>
            <li>Pengguna login untuk akses sistem.</li>
            <li>Dokumen PDF diproses dan diekstrak.</li>
            <li>Hasil kesalahan format ditampilkan otomatis.</li>
          </ol>
        </div>
      </section>

      <section className="auth-card" aria-live="polite">
        <div className="card-ribbon">
          <span className="ribbon-dot" />
          <span>Akses sistem validasi</span>
        </div>

        <div className="card-head">
          <div>
            <p className="card-label">SIDASI Validator</p>
            <h2>
              {auth.tab === "login"
                ? "Masuk"
                : auth.tab === "register"
                  ? "Daftar"
                  : auth.tab === "forgot"
                    ? "Lupa Password"
                    : "Reset Password"}
            </h2>
          </div>
          <div className="card-badge">Auth Module</div>
        </div>

        <AuthTabs tab={auth.tab} onTabChange={auth.onTabChange} />

        {auth.serverMessage ? (
          <p className="server-message">{auth.serverMessage}</p>
        ) : null}

        <AuthForms
          tab={auth.tab}
          errors={auth.errors}
          activeInlineErrors={auth.activeInlineErrors}
          isSubmitting={auth.isSubmitting}
          registerForm={auth.registerForm}
          setRegisterForm={auth.setRegisterForm}
          loginForm={auth.loginForm}
          setLoginForm={auth.setLoginForm}
          forgotForm={auth.forgotForm}
          setForgotForm={auth.setForgotForm}
          resetForm={auth.resetForm}
          setResetForm={auth.setResetForm}
          submitRegister={auth.submitRegister}
          submitLogin={auth.submitLogin}
          submitForgotPassword={auth.submitForgotPassword}
          submitResetPassword={auth.submitResetPassword}
        />
      </section>
    </main>
  );
}
