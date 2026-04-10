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
      <section className="brand">
        <p className="kicker">Belajar UI + API Auth</p>
        <h1>Alur autentikasi yang mulus dimulai dari feedback yang jelas.</h1>
        <p className="lead">
          Coba simulasi daftar, login, dan reset password. Semua validasi
          ditampilkan saat pengguna mengetik.
        </p>
      </section>

      <section className="auth-card" aria-live="polite">
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
