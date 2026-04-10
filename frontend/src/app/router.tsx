import { useEffect, useState } from "react";
import { AuthPage } from "../features/auth/pages/AuthPage";
import { meApi } from "../features/auth/services/auth.api";
import type { AuthSession, AuthUser } from "../features/auth/types/auth.types";
import { DashboardPage } from "../features/dashboard/pages/DashboardPage";

const AUTH_TOKEN_KEY = "sidasi_auth_token";

export function AppRouter() {
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    async function bootstrapSession() {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);

      if (!token) {
        setIsBootstrapping(false);
        return;
      }

      try {
        const data = await meApi(token);
        setCurrentUser(data.data);
      } catch {
        localStorage.removeItem(AUTH_TOKEN_KEY);
      } finally {
        setIsBootstrapping(false);
      }
    }

    bootstrapSession();
  }, []);

  function onLoginSuccess(session: AuthSession) {
    localStorage.setItem(AUTH_TOKEN_KEY, session.token);
    setCurrentUser(session.user);
  }

  function onLogout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setCurrentUser(null);
  }

  if (isBootstrapping) {
    return null;
  }

  if (currentUser) {
    return <DashboardPage user={currentUser} onLogout={onLogout} />;
  }

  return <AuthPage onLoginSuccess={onLoginSuccess} />;
}
