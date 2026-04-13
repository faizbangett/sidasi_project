type DetailHeaderSummaryProps = {
  fileName: string;
  validationDate: string;
  score: number;
  status: string;
};

export function DetailHeaderSummary({
  fileName,
  validationDate,
  score,
  status,
}: DetailHeaderSummaryProps) {
  return (
    <article className="dashboard-section detail-header-summary">
      <p className="detail-kicker">Laporan Hasil Validasi</p>
      <h2 className="detail-title">{fileName}</h2>
      <p className="detail-meta">
        Divalidasi pada: {validationDate} | Skor Akhir:{" "}
        <strong>{score}/100</strong>
        <span className="detail-score-dot" aria-hidden="true" /> {status}
      </p>
    </article>
  );
}
