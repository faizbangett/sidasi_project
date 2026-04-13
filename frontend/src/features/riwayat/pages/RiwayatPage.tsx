import { useState } from "react";
import type { AuthUser } from "../../auth/types/auth.types";
import {
  AppHeader,
  AppSidebar,
  InternalAreaShell,
} from "../../../shared/components/applayout";
import { RiwayatHeroSection } from "../components/RiwayatHeroSection";
import { RiwayatStatePanel } from "../components/RiwayatStatePanel";
import { RiwayatTableSection } from "../components/RiwayatTableSection";
import { RiwayatToolbar } from "../components/RiwayatToolbar";
import { useRiwayatValidationFlow } from "../hooks/useRiwayatValidationFlow";
import "../../dashboard/styles/dashboard-page.css";
import "../styles/riwayat-page.css";

type RiwayatPageProps = {
  user: AuthUser;
  onLogout: () => void;
  onNavigateDashboard: () => void;
  onNavigateUpload: () => void;
  onViewDetail: (recordId: string) => void;
};

export function RiwayatPage({
  user,
  onLogout,
  onNavigateDashboard,
  onNavigateUpload,
  onViewDetail,
}: RiwayatPageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const historyFlow = useRiwayatValidationFlow();

  return (
    <main className="dashboard-page">
      <InternalAreaShell
        header={
          <AppHeader
            appLabel="Riwayat Lengkap"
            userName={user.name}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />
        }
        sidebar={
          <AppSidebar
            appLabel="SIDASI Validator"
            onLogout={onLogout}
            activeItem="history"
            onNavigateDashboard={onNavigateDashboard}
            onNavigateUpload={onNavigateUpload}
            isOpen={sidebarOpen}
          />
        }
      >
        <section
          className="dashboard-main riwayat-page"
          aria-label="Riwayat validasi"
        >
          <RiwayatHeroSection totalRecords={historyFlow.records.length} />

          <RiwayatToolbar
            searchTerm={historyFlow.searchTerm}
            sortOrder={historyFlow.sortOrder}
            onSearchTermChange={historyFlow.setSearchTerm}
            onSortOrderChange={historyFlow.setSortOrder}
            onClearSearch={historyFlow.clearSearch}
          />

          {historyFlow.displayState === "loading" ? (
            <RiwayatStatePanel
              variant="loading"
              title="Mengambil data riwayat Anda dari server..."
              description="Gunakan animasi Skeleton Loading atau Spinner di sini"
            />
          ) : null}

          {historyFlow.displayState === "empty" ? (
            <RiwayatStatePanel
              variant="empty"
              title="Belum Ada Riwayat Validasi"
              description="Anda belum pernah mengunggah dokumen Laporan TA. Silakan lakukan validasi dokumen pertama Anda sekarang."
              actionLabel="Upload TA Sekarang"
              onAction={onNavigateUpload}
            />
          ) : null}

          {historyFlow.displayState === "no-results" ? (
            <RiwayatStatePanel
              variant="no-results"
              title="Dokumen Tidak Ditemukan"
              description="Tidak ada file yang cocok dengan kata kunci tersebut. Coba gunakan nama file yang lain."
              actionLabel="Bersihkan Pencarian"
              onAction={historyFlow.clearSearch}
            />
          ) : null}

          {historyFlow.displayState === "error" ? (
            <RiwayatStatePanel
              variant="error"
              title="Gagal Menarik Data Riwayat Validasi"
              description={
                historyFlow.errorMessage ??
                "Terjadi masalah pada koneksi ke server. Silakan periksa koneksi internet Anda dan coba lagi."
              }
              actionLabel="Muat Ulang Halaman"
              onAction={historyFlow.retry}
            />
          ) : null}

          {historyFlow.displayState === "table" ? (
            <RiwayatTableSection
              records={historyFlow.visibleRecords}
              totalRecords={historyFlow.totalRecords}
              currentPage={historyFlow.currentPage}
              pageCount={historyFlow.pageCount}
              startIndex={historyFlow.startIndex}
              endIndex={historyFlow.endIndex}
              onCurrentPageChange={historyFlow.setCurrentPage}
              onViewDetail={onViewDetail}
            />
          ) : null}
        </section>
      </InternalAreaShell>
    </main>
  );
}
