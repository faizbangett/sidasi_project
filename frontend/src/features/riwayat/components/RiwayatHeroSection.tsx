type RiwayatHeroSectionProps = {
  totalRecords: number;
};

export function RiwayatHeroSection({ totalRecords }: RiwayatHeroSectionProps) {
  return (
    <article className="dashboard-section riwayat-hero">
      <p className="riwayat-kicker">Riwayat Lengkap Validasi</p>
      <h2 className="riwayat-title">
        Laporan hasil validasi dokumen mahasiswa
      </h2>
      <p className="riwayat-subtitle">
        Daftar seluruh dokumen yang pernah Anda periksa menggunakan sistem.
        Total data terdeteksi: {totalRecords} dokumen.
      </p>
    </article>
  );
}
