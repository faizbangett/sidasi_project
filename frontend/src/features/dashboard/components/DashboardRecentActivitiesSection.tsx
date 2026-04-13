import { DashboardSection } from "../../../shared/components/dashboard";

export function DashboardRecentActivitiesSection() {
  return (
    <DashboardSection title="AKTIVITAS TERAKHIR">
      <ul className="dashboard-activity-list">
        <li>
          <p className="dashboard-activity-title">📄 BAB_1_Pendahuluan.pdf</p>
          <p>13 Jan 2026, 14:30 WIB | Skor: 85 | Lihat Detail →</p>
        </li>
        <li>
          <p className="dashboard-activity-title">📄 Laporan_Draft_1.pdf</p>
          <p>10 Jan 2026, 09:15 WIB | Skor: 65 | Lihat Detail →</p>
        </li>
      </ul>
      <button type="button" className="dashboard-link-action">
        Lihat Semua Riwayat →
      </button>
    </DashboardSection>
  );
}
