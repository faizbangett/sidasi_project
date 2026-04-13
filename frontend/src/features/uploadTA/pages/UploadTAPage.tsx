import { useState } from "react";
import type { AuthUser } from "../../auth/types/auth.types";
import {
  AppHeader,
  AppSidebar,
  InternalAreaShell,
} from "../../../shared/components/applayout";
import { UploadDropzoneSection } from "../components/UploadDropzoneSection";
import { UploadIntroSection } from "../components/UploadIntroSection";
import { UploadSubmitAction } from "../components/UploadSubmitAction";
import { useUploadTAFlow } from "../hooks/useUploadTAFlow";
import "../../dashboard/styles/dashboard-page.css";
import "../styles/upload-ta-page.css";

type UploadTAPageProps = {
  user: AuthUser;
  onLogout: () => void;
  onNavigateDashboard: () => void;
};

export function UploadTAPage({
  user,
  onLogout,
  onNavigateDashboard,
}: UploadTAPageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const uploadFlow = useUploadTAFlow();

  return (
    <main className="dashboard-page">
      <InternalAreaShell
        header={
          <AppHeader
            appLabel="Upload Dokumen TA"
            userName={user.name}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />
        }
        sidebar={
          <AppSidebar
            appLabel="SIDASI Validator"
            onLogout={onLogout}
            activeItem="upload-ta"
            onNavigateDashboard={onNavigateDashboard}
            isOpen={sidebarOpen}
          />
        }
      >
        <section
          className="dashboard-main upload-page"
          aria-label="Halaman upload TA"
        >
          <UploadIntroSection />
          <UploadDropzoneSection
            state={uploadFlow.state}
            selectedFile={uploadFlow.selectedFile}
            helperText={uploadFlow.helperText}
            isDragging={uploadFlow.isDragging}
            errorMessage={uploadFlow.errorMessage}
            progress={uploadFlow.progress}
            statusMessage={uploadFlow.statusMessage}
            validationResult={uploadFlow.validationResult}
            fileInputRef={uploadFlow.fileInputRef}
            onFileInputChange={uploadFlow.onFileInputChange}
            onDragEnter={uploadFlow.onDragEnter}
            onDragOver={uploadFlow.onDragOver}
            onDragLeave={uploadFlow.onDragLeave}
            onDrop={uploadFlow.onDrop}
            onDropzoneKeyDown={uploadFlow.onDropzoneKeyDown}
            openFilePicker={uploadFlow.openFilePicker}
            onResetFile={uploadFlow.onResetFile}
          />
          <UploadSubmitAction
            state={uploadFlow.state}
            canStart={uploadFlow.canStart}
            onStartValidation={uploadFlow.onStartValidation}
          />
        </section>
      </InternalAreaShell>
    </main>
  );
}
