type DashboardWelcomeProps = {
  firstName: string;
};

export function DashboardWelcome({ firstName }: DashboardWelcomeProps) {
  return (
    <div className="dashboard-welcome">
      <p>Halo, {firstName}! 👋</p>
      <p>Selamat datang di Pusat Validasi Laporan Tugas Akhir.</p>
    </div>
  );
}
