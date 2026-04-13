import {
  DashboardSection,
  SummaryStatCard,
} from "../../../shared/components/dashboard";

export function DashboardSummarySection() {
  return (
    <DashboardSection title="RINGKASAN AKTIVITAS ANDA">
      <div className="summary-stats-grid">
        <SummaryStatCard label="Total Validasi" value="5" note="Dokumen" />
        <SummaryStatCard label="Skor Tertinggi" value="85/100" />
        <SummaryStatCard label="Status Terakhir" value="Revisi Minor" />
      </div>
    </DashboardSection>
  );
}
