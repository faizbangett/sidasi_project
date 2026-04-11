import type { AuthUser } from "../../auth/types/auth.types";
import "../styles/dashboard-page.css";

type DashboardPageProps = {
  user: AuthUser;
  onLogout: () => void;
};

export function DashboardPage({ user, onLogout }: DashboardPageProps) {
  return (
    <main className="dashboard-page">
      <header className="dashboard-topbar">
        <div>
          <p className="eyebrow">SIDASI Validator Dashboard</p>
          <h1>Selamat datang, {user.name}</h1>
          <p className="muted">
            Sesi aktif. Kamu siap mengakses modul validasi format laporan Tugas
            Akhir.
          </p>
        </div>
        <button type="button" className="ghost-btn" onClick={onLogout}>
          Logout
        </button>
      </header>

      <section className="dashboard-grid">
        <article className="panel">
          <h2>Profil Pengguna Sistem</h2>
          <p className="muted">
            Data berikut digunakan sebagai identitas akses pada aplikasi
            validasi format dokumen.
          </p>
          <dl className="identity-list">
            <div>
              <dt>ID Pengguna</dt>
              <dd>{user.id}</dd>
            </div>
            <div>
              <dt>Nama</dt>
              <dd>{user.name}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{user.email}</dd>
            </div>
          </dl>
        </article>

        <article className="panel panel-accent">
          <h2>Roadmap Implementasi Proposal</h2>
          <ol>
            <li>Bangun modul upload dan parsing dokumen PDF.</li>
            <li>Terapkan rule validasi sesuai pedoman KTI POLIJE.</li>
            <li>Tampilkan hasil error format beserta saran perbaikan.</li>
          </ol>
        </article>
      </section>
    </main>
  );
}
