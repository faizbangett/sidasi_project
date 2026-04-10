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
          <p className="eyebrow">SIDASI Dashboard</p>
          <h1>Selamat datang, {user.name}</h1>
          <p className="muted">
            Kamu berhasil login dan sesi autentikasi aktif.
          </p>
        </div>
        <button type="button" className="ghost-btn" onClick={onLogout}>
          Logout
        </button>
      </header>

      <section className="dashboard-grid">
        <article className="panel">
          <h2>Status Autentikasi</h2>
          <p className="muted">
            Halaman ini hanya muncul setelah login berhasil.
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
          <h2>Langkah Lanjut Belajar</h2>
          <ol>
            <li>Tambahkan route protected dengan token/JWT.</li>
            <li>Simpan sesi ke localStorage atau cookie httpOnly.</li>
            <li>Ambil data user profile dari endpoint backend.</li>
          </ol>
        </article>
      </section>
    </main>
  );
}
