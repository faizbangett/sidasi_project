import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import type { RiwayatRecord } from "../services/riwayat.api";

type RiwayatTableSectionProps = {
  records: RiwayatRecord[];
  totalRecords: number;
  currentPage: number;
  pageCount: number;
  startIndex: number;
  endIndex: number;
  onCurrentPageChange: (page: number) => void;
  onViewDetail: (recordId: string) => void;
};

function scoreClass(score: number) {
  if (score >= 90) return "is-green";
  if (score >= 75) return "is-yellow";
  if (score >= 60) return "is-orange";
  return "is-red";
}

export function RiwayatTableSection({
  records,
  totalRecords,
  currentPage,
  pageCount,
  startIndex,
  endIndex,
  onCurrentPageChange,
  onViewDetail,
}: RiwayatTableSectionProps) {
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <section className="dashboard-section riwayat-table-section">
      <div className="riwayat-table-wrap">
        <table className="riwayat-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama File Dokumen</th>
              <th>Tanggal</th>
              <th>Skor</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={record.id}>
                <td>{startIndex + index}.</td>
                <td>
                  <strong>{record.fileName}</strong>
                </td>
                <td>{record.validationDate}</td>
                <td>
                  <span
                    className={`riwayat-score-badge ${scoreClass(record.score)}`}
                  >
                    {record.score}
                  </span>
                </td>
                <td>
                  <button
                    type="button"
                    className="riwayat-detail-btn"
                    onClick={() => onViewDetail(record.id)}
                  >
                    <Eye size={14} aria-hidden="true" />
                    Lihat Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="riwayat-table-footer">
        <p className="riwayat-table-info">
          Menampilkan {startIndex}-{endIndex} dari {totalRecords} dokumen
        </p>

        <div className="riwayat-pagination" aria-label="Pagination riwayat">
          <button
            type="button"
            className="riwayat-page-btn"
            onClick={() => onCurrentPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={14} aria-hidden="true" />
            Prev
          </button>

          <div className="riwayat-page-numbers">
            {pages.map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                className={`riwayat-page-number${pageNumber === currentPage ? " is-active" : ""}`}
                onClick={() => onCurrentPageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="riwayat-page-btn"
            onClick={() =>
              onCurrentPageChange(Math.min(pageCount, currentPage + 1))
            }
            disabled={currentPage === pageCount}
          >
            Next
            <ChevronRight size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
