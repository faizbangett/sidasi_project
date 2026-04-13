import { useState } from "react";
import type { AuthUser } from "../../auth/types/auth.types";
import {
  AppHeader,
  AppSidebar,
  InternalAreaShell,
} from "../../../shared/components/applayout";
import {
  DashboardRecentActivitiesSection,
  DashboardStartValidationSection,
  DashboardSummarySection,
  DashboardWelcome,
} from "..";
import "../styles/dashboard-page.css";

type DashboardPageProps = {
  user: AuthUser;
  onLogout: () => void;
};

export function DashboardPage({ user, onLogout }: DashboardPageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const firstName = user.name.trim().split(" ")[0] || "Pengguna";

  return (
    <main className="dashboard-page">
      <InternalAreaShell
        header={
          <AppHeader
            appLabel="Dashboard"
            userName={user.name}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />
        }
        sidebar={
          <AppSidebar
            appLabel="SIDASI Validator"
            onLogout={onLogout}
            isOpen={sidebarOpen}
          />
        }
      >
        <section className="dashboard-main" aria-label="Konten dashboard">
          <DashboardWelcome firstName={firstName} />
          <DashboardSummarySection />
          <DashboardStartValidationSection />
          <DashboardRecentActivitiesSection />
        </section>
      </InternalAreaShell>
    </main>
  );
}
