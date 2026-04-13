import { useState } from "react";
import type { AuthUser } from "../../auth/types/auth.types";
import {
  AppHeader,
  AppSidebar,
  InternalAreaShell,
} from "../../../shared/components/applayout";
import { DetailHeaderSummary } from "../components/DetailHeaderSummary";
import { DetailLoadingPanel } from "../components/DetailLoadingPanel";
import { DetailPdfPlaceholder } from "../components/DetailPdfPlaceholder";
import { DetailRevisionList } from "../components/DetailRevisionList";
import { DetailSplitView } from "../components/DetailSplitView";
import { DetailStatePanel } from "../components/DetailStatePanel";
import { useDetailValidationFlow } from "../hooks/useDetailValidationFlow";
import "../../dashboard/styles/dashboard-page.css";
import "../styles/detail-page.css";

type DetailPageProps = {
  user: AuthUser;
  recordId: string | null;
  onLogout: () => void;
  onNavigateHistory: () => void;
};

export function DetailPage({
  user,
  recordId,
  onLogout,
  onNavigateHistory,
}: DetailPageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const detailFlow = useDetailValidationFlow(recordId);

  return (
    <main className="dashboard-page">
      <InternalAreaShell
        header={
          <AppHeader
            appLabel="Lihat Detail"
            userName={user.name}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />
        }
        sidebar={
          <AppSidebar
            appLabel="SIDASI Validator"
            onLogout={onLogout}
            activeItem="history"
            onNavigateHistory={onNavigateHistory}
            isOpen={sidebarOpen}
          />
        }
      >
        <section
          className="dashboard-main detail-page"
          aria-label="Detail validasi"
        >
          <div className="detail-top-actions">
            <button
              type="button"
              className="riwayat-detail-btn"
              onClick={onNavigateHistory}
            >
              Kembali ke Riwayat
            </button>
          </div>

          {detailFlow.displayState === "loading" ? (
            <DetailLoadingPanel />
          ) : null}

          {detailFlow.displayState === "not-found" ? (
            <DetailStatePanel
              title="Data validasi tidak ditemukan atau Anda tidak memiliki akses ke dokumen ini."
              description={
                detailFlow.errorMessage ??
                "Silakan kembali ke riwayat untuk memilih dokumen lain."
              }
              actionLabel="Kembali ke Riwayat"
              onAction={onNavigateHistory}
            />
          ) : null}

          {detailFlow.displayState === "error" ? (
            <DetailStatePanel
              title="Terjadi masalah saat memuat detail validasi"
              description={detailFlow.errorMessage ?? "Silakan coba lagi."}
              actionLabel="Kembali ke Riwayat"
              onAction={onNavigateHistory}
            />
          ) : null}

          {detailFlow.displayState === "success" && detailFlow.record ? (
            <>
              <DetailHeaderSummary
                fileName={detailFlow.record.fileName}
                validationDate={detailFlow.record.validationDate}
                score={detailFlow.record.score}
                status={detailFlow.record.status}
              />

              <DetailSplitView
                leftTitle="🔍 Preview PDF"
                rightTitle="📝 Daftar Revisi"
                leftContent={
                  <DetailPdfPlaceholder
                    mode="available"
                    description="Dokumen PDF asli telah dimuat dan siap dibaca pada sisi kiri."
                  />
                }
                rightContent={
                  <DetailRevisionList revisions={detailFlow.record.revisions} />
                }
              />
            </>
          ) : null}

          {detailFlow.displayState === "file-missing" && detailFlow.record ? (
            <>
              <DetailHeaderSummary
                fileName={detailFlow.record.fileName}
                validationDate={detailFlow.record.validationDate}
                score={detailFlow.record.score}
                status={detailFlow.record.status}
              />

              <DetailSplitView
                leftTitle="🔍 Preview PDF"
                rightTitle="📝 Daftar Revisi"
                leftContent={
                  <DetailPdfPlaceholder
                    mode="missing"
                    description="File PDF asli sudah dihapus dari server untuk menghemat ruang, tetapi data revisi tetap tersedia."
                  />
                }
                rightContent={
                  <DetailRevisionList revisions={detailFlow.record.revisions} />
                }
              />
            </>
          ) : null}
        </section>
      </InternalAreaShell>
    </main>
  );
}
