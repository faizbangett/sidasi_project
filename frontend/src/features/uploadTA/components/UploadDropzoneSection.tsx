import { FileText, Hourglass, UploadCloud, X } from "lucide-react";
import type { ChangeEvent, DragEvent, KeyboardEvent, RefObject } from "react";
import type { UploadState } from "../hooks/useUploadTAFlow";
import type { ValidationResultSummary } from "../services/upload-ta.api";

type UploadDropzoneSectionProps = {
  state: UploadState;
  selectedFile: File | null;
  helperText: string;
  isDragging: boolean;
  errorMessage: string | null;
  progress: number;
  statusMessage: string;
  validationResult: ValidationResultSummary | null;
  fileInputRef: RefObject<HTMLInputElement>;
  onFileInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onDragEnter: (event: DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: DragEvent<HTMLDivElement>) => void;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onDropzoneKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
  openFilePicker: () => void;
  onResetFile: () => void;
};

export function UploadDropzoneSection({
  state,
  selectedFile,
  helperText,
  isDragging,
  errorMessage,
  progress,
  statusMessage,
  validationResult,
  fileInputRef,
  onFileInputChange,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop,
  onDropzoneKeyDown,
  openFilePicker,
  onResetFile,
}: UploadDropzoneSectionProps) {
  return (
    <article className="dashboard-section upload-dropzone-section">
      <p className="upload-section-heading">Area Unggah (Dropzone)</p>

      <div
        className={`upload-dropzone${isDragging ? " is-dragging" : ""}${state === "processing" ? " is-processing" : ""}`}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        role="button"
        tabIndex={0}
        onClick={openFilePicker}
        onKeyDown={onDropzoneKeyDown}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          className="upload-hidden-input"
          onChange={onFileInputChange}
        />

        {state === "idle" && (
          <div className="upload-dropzone-content">
            <UploadCloud size={38} aria-hidden="true" />
            <p className="upload-dropzone-title">
              Tarik dan lepas dokumen di sini
            </p>
            <p className="upload-dropzone-or">atau</p>
            <button type="button" className="upload-browse-btn">
              Browse File PDF
            </button>
            <p className="upload-helper-text">{helperText}</p>
          </div>
        )}

        {state === "selected" && selectedFile && (
          <div className="upload-selected-content">
            <p className="upload-selected-label">File siap divalidasi</p>
            <div className="upload-file-row">
              <FileText size={18} aria-hidden="true" />
              <div>
                <p className="upload-file-name">{selectedFile.name}</p>
                <p className="upload-file-meta">{helperText}</p>
              </div>
            </div>

            <div className="upload-selected-actions">
              <button
                type="button"
                className="upload-secondary-btn"
                onClick={(event) => {
                  event.stopPropagation();
                  openFilePicker();
                }}
              >
                Ganti File
              </button>
              <button
                type="button"
                className="upload-secondary-btn is-danger"
                onClick={(event) => {
                  event.stopPropagation();
                  onResetFile();
                }}
              >
                <X size={16} aria-hidden="true" />
                Hapus
              </button>
            </div>
          </div>
        )}

        {state === "processing" && selectedFile && (
          <div className="upload-processing-content">
            <p className="upload-processing-label">
              <Hourglass size={16} aria-hidden="true" /> Sedang memproses
              dokumen...
            </p>
            <div className="upload-file-row">
              <FileText size={18} aria-hidden="true" />
              <div>
                <p className="upload-file-name">{selectedFile.name}</p>
                <p className="upload-file-meta">{helperText}</p>
              </div>
            </div>

            <div className="upload-progress-wrap" aria-live="polite">
              <div className="upload-progress-track">
                <div
                  className="upload-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="upload-progress-text">{progress}%</p>
            </div>
            <p className="upload-status-text">Status: {statusMessage}</p>
          </div>
        )}

        {state === "result" && selectedFile && validationResult && (
          <div className="upload-result-content">
            <p className="upload-result-title">Laporan Hasil Validasi</p>

            <div className="upload-file-row">
              <FileText size={18} aria-hidden="true" />
              <div>
                <p className="upload-file-name">{validationResult.fileName}</p>
                <p className="upload-file-meta">
                  Skor akhir: {validationResult.score}/100 (
                  {validationResult.status})
                </p>
              </div>
            </div>

            <div className="upload-result-actions">
              <button
                type="button"
                className="upload-secondary-btn"
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                Unduh PDF Laporan
              </button>
              <button
                type="button"
                className="upload-secondary-btn"
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                Validasi Ulang Dokumen
              </button>
            </div>

            <div className="upload-result-issues">
              <p className="upload-result-issues-title">
                Detail kesalahan tata letak & konten
              </p>

              <ul>
                {validationResult.issues.map((issue, index) => (
                  <li key={`${issue.page}-${issue.category}-${index}`}>
                    <span
                      className={`upload-severity-dot is-${issue.severity}`}
                      aria-hidden="true"
                    />
                    <p>
                      Halaman {issue.page} [{issue.category}] - {issue.message}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {errorMessage ? <p className="upload-error">{errorMessage}</p> : null}
    </article>
  );
}
