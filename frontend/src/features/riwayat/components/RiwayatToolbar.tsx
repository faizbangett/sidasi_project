import { Search } from "lucide-react";
import type { RiwayatSortOrder } from "../hooks/useRiwayatValidationFlow";

type RiwayatToolbarProps = {
  searchTerm: string;
  sortOrder: RiwayatSortOrder;
  onSearchTermChange: (value: string) => void;
  onSortOrderChange: (value: RiwayatSortOrder) => void;
  onClearSearch: () => void;
};

export function RiwayatToolbar({
  searchTerm,
  sortOrder,
  onSearchTermChange,
  onSortOrderChange,
  onClearSearch,
}: RiwayatToolbarProps) {
  return (
    <section className="dashboard-section riwayat-toolbar">
      <p className="riwayat-section-title">Filter & Pencarian</p>

      <div className="riwayat-toolbar-grid">
        <label className="riwayat-search-field">
          <span className="riwayat-field-label">
            <Search size={16} aria-hidden="true" />
            Cari nama file dokumen...
          </span>
          <div className="riwayat-search-input-wrap">
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => onSearchTermChange(event.target.value)}
              placeholder="Cari nama file dokumen..."
            />
            {searchTerm ? (
              <button
                type="button"
                className="riwayat-clear-btn"
                onClick={onClearSearch}
              >
                x
              </button>
            ) : null}
          </div>
        </label>

        <label className="riwayat-sort-field">
          <span className="riwayat-field-label">Urutkan</span>
          <select
            value={sortOrder}
            onChange={(event) =>
              onSortOrderChange(event.target.value as RiwayatSortOrder)
            }
          >
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
            <option value="score-desc">Skor Tertinggi</option>
            <option value="score-asc">Skor Terendah</option>
          </select>
        </label>
      </div>
    </section>
  );
}
