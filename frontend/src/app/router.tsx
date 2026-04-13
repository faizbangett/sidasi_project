import { useEffect, useMemo, useState } from "react";
import { AuthPage } from "../features/auth/pages/AuthPage";
import { meApi } from "../features/auth/services/auth.api";
import type { AuthSession, AuthUser } from "../features/auth/types/auth.types";
import { DashboardPage } from "../features/dashboard/pages/DashboardPage";
import { DetailPage } from "../features/detail";
import { RiwayatPage } from "../features/riwayat/index";
import { UploadTAPage } from "../features/uploadTA";

const AUTH_TOKEN_KEY = "sidasi_auth_token";

type RouteState =
  | { page: "dashboard" }
  | { page: "upload-ta" }
  | { page: "history" }
  | { page: "detail"; recordId: string | null };

function buildRouteFromPath(pathname: string): RouteState {
  if (pathname.startsWith("/upload-ta")) {
    return { page: "upload-ta" };
  }

  if (pathname.startsWith("/history")) {
    return { page: "history" };
  }

  if (pathname.startsWith("/result/")) {
    const recordId = pathname.split("/").filter(Boolean)[1] ?? null;
    return { page: "detail", recordId };
  }

  return { page: "dashboard" };
}

function routeToPath(route: RouteState) {
  switch (route.page) {
    case "upload-ta":
      return "/upload-ta";
    case "history":
      return "/history";
    case "detail":
      return route.recordId ? `/result/${route.recordId}` : "/result";
    default:
      return "/dashboard";
  }
}

export function AppRouter() {
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [route, setRoute] = useState<RouteState>(() =>
    buildRouteFromPath(window.location.pathname),
  );

  const activePage = useMemo(() => route.page, [route]);

  useEffect(() => {
    function handlePopState() {
      setRoute(buildRouteFromPath(window.location.pathname));
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

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

  function navigate(nextRoute: RouteState) {
    const nextPath = routeToPath(nextRoute);
    window.history.pushState({}, "", nextPath);
    setRoute(nextRoute);
  }

  function onLoginSuccess(session: AuthSession) {
    localStorage.setItem(AUTH_TOKEN_KEY, session.token);
    setCurrentUser(session.user);
    navigate({ page: "dashboard" });
  }

  function onLogout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setCurrentUser(null);
    navigate({ page: "dashboard" });
  }

  function onViewDetail(recordId: string) {
    navigate({ page: "detail", recordId });
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
          onNavigateDashboard={() => navigate({ page: "dashboard" })}
          onNavigateHistory={() => navigate({ page: "history" })}
        />
      );
    }

    if (activePage === "detail") {
      return (
        <DetailPage
          user={currentUser}
          recordId={route.page === "detail" ? route.recordId : null}
          onLogout={onLogout}
          onNavigateHistory={() => navigate({ page: "history" })}
        />
      );
    }

    if (activePage === "history") {
      return (
        <RiwayatPage
          user={currentUser}
          onLogout={onLogout}
          onNavigateDashboard={() => navigate({ page: "dashboard" })}
          onNavigateUpload={() => navigate({ page: "upload-ta" })}
          onViewDetail={onViewDetail}
        />
      );
    }

    return (
      <DashboardPage
        user={currentUser}
        onLogout={onLogout}
        onNavigateUpload={() => navigate({ page: "upload-ta" })}
        onNavigateHistory={() => navigate({ page: "history" })}
      />
    );
  }

  return <AuthPage onLoginSuccess={onLoginSuccess} />;
}
