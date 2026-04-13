import { FileX2, FileText } from "lucide-react";

type DetailPdfPlaceholderProps = {
  mode: "available" | "missing" | "not-found";
  description: string;
};

export function DetailPdfPlaceholder({
  mode,
  description,
}: DetailPdfPlaceholderProps) {
  const icon =
    mode === "available" ? (
      <FileText size={20} aria-hidden="true" />
    ) : (
      <FileX2 size={20} aria-hidden="true" />
    );

  return (
    <div className="detail-pdf-placeholder">
      <div className="detail-pdf-preview-box">
        <div className="detail-pdf-placeholder-icon">{icon}</div>
        <p className="detail-pdf-placeholder-title">
          {mode === "available" ? "Preview PDF" : "Preview Tidak Tersedia"}
        </p>
        <p className="detail-pdf-placeholder-description">{description}</p>
      </div>
    </div>
  );
}
