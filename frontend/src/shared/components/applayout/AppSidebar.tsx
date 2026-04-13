import {
  BookOpenText,
  FileClock,
  Gauge,
  LogOut,
  Settings,
  Upload,
} from "lucide-react";

type AppSidebarProps = {
  appLabel: string;
  onLogout: () => void;
  isOpen?: boolean;
};

export function AppSidebar({
  appLabel,
  onLogout,
  isOpen = true,
}: AppSidebarProps) {
  return (
    <aside
      className={`dashboard-sidebar app-sidebar${isOpen ? " is-open" : " is-closed"}`}
      aria-label="Navigasi utama"
    >
      <p className="app-sidebar__brand">{appLabel}</p>

      <div className="app-sidebar__group">
        <p className="app-sidebar__section-title">Navigasi Utama</p>
        <nav>
          <ul className="dashboard-nav-list">
            <li>
              <button type="button" className="dashboard-nav-link is-active">
                <Gauge size={16} aria-hidden="true" />
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button type="button" className="dashboard-nav-link">
                <Upload size={16} aria-hidden="true" />
                <span>Upload TA</span>
              </button>
            </li>
            <li>
              <button type="button" className="dashboard-nav-link">
                <FileClock size={16} aria-hidden="true" />
                <span>Riwayat Lengkap</span>
              </button>
            </li>
            <li>
              <button type="button" className="dashboard-nav-link">
                <BookOpenText size={16} aria-hidden="true" />
                <span>Panduan KTI</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="app-sidebar__group">
        <p className="app-sidebar__section-title">Pengaturan</p>
        <ul className="dashboard-nav-list">
          <li>
            <button type="button" className="dashboard-nav-link">
              <Settings size={16} aria-hidden="true" />
              <span>Profil</span>
            </button>
          </li>
        </ul>
      </div>

      <button type="button" className="dashboard-logout" onClick={onLogout}>
        <LogOut size={16} aria-hidden="true" />
        <span>Keluar</span>
      </button>
    </aside>
  );
}
