import { LoaderCircle } from "lucide-react";

export function DetailLoadingPanel() {
  return (
    <section className="dashboard-section detail-loading-panel">
      <p className="detail-kicker">Memuat Detail Validasi...</p>
      <p className="detail-loading-note">
        [ ⏳ Mengambil data skor dan riwayat... ]
      </p>

      <div className="detail-split-view detail-split-view--loading">
        <div className="detail-split-column">
          <p className="detail-column-title">🔍 Preview PDF</p>
          <div className="detail-state-box">
            <LoaderCircle
              size={18}
              className="detail-spinner"
              aria-hidden="true"
            />
            <p>Kotak abu-abu animasi berkedip menandakan PDF sedang dimuat</p>
          </div>
        </div>
        <div className="detail-split-column">
          <p className="detail-column-title">📝 Daftar Revisi</p>
          <div className="detail-state-box">
            <LoaderCircle
              size={18}
              className="detail-spinner"
              aria-hidden="true"
            />
            <p>Kotak abu-abu animasi berkedip menandakan daftar error dimuat</p>
          </div>
        </div>
      </div>
    </section>
  );
}
