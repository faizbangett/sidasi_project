import { DashboardSection } from "../../../shared/components/dashboard";

export function DashboardStartValidationSection() {
  return (
    <DashboardSection title="MULAI VALIDASI BARU">
      <p className="dashboard-caption">
        🚀 Draft Anda sudah siap? Pastikan format sesuai pedoman.
      </p>
      <button type="button" className="dashboard-primary-action">
        MULAI VALIDASI SEKARANG →
      </button>
      <p className="dashboard-helper">
        "Tombol ini akan mengarahkan ke halaman Upload TA"
      </p>
    </DashboardSection>
  );
}
