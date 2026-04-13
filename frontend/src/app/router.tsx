import { useEffect, useState } from "react";
import { AuthPage } from "../features/auth/pages/AuthPage";
import { meApi } from "../features/auth/services/auth.api";
import type { AuthSession, AuthUser } from "../features/auth/types/auth.types";
import { DashboardPage } from "../features/dashboard/pages/DashboardPage";
import { UploadTAPage } from "../features/uploadTA";

const AUTH_TOKEN_KEY = "sidasi_auth_token";
type InternalPage = "dashboard" | "upload-ta";

export function AppRouter() {
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [activePage, setActivePage] = useState<InternalPage>("dashboard");

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
    setActivePage("dashboard");
  }

  function onLogout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setCurrentUser(null);
    setActivePage("dashboard");
  }

  if (isBootstrapping) {
    return null;
  }

  if (currentUser) {
    if (activePage === "upload-ta") {
      return (
        <UploadTAPage
          user={currentUser}
          onLogout={onLogout}
          onNavigateDashboard={() => setActivePage("dashboard")}
        />
      );
    }

    return (
      <DashboardPage
        user={currentUser}
        onLogout={onLogout}
        onNavigateUpload={() => setActivePage("upload-ta")}
      />
    );
  }

  return <AuthPage onLoginSuccess={onLoginSuccess} />;
}
