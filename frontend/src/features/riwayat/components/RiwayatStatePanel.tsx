import {
  AlertTriangle,
  Inbox,
  LoaderCircle,
  RefreshCcw,
  SearchX,
  UploadCloud,
} from "lucide-react";

type RiwayatStatePanelProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: "loading" | "empty" | "no-results" | "error";
};

export function RiwayatStatePanel({
  title,
  description,
  actionLabel,
  onAction,
  variant = "empty",
}: RiwayatStatePanelProps) {
  const icon =
    variant === "loading" ? (
      <LoaderCircle
        size={34}
        className="riwayat-state-spinner"
        aria-hidden="true"
      />
    ) : variant === "error" ? (
      <AlertTriangle size={34} aria-hidden="true" />
    ) : variant === "no-results" ? (
      <SearchX size={34} aria-hidden="true" />
    ) : (
      <Inbox size={34} aria-hidden="true" />
    );

  return (
    <section className="dashboard-section riwayat-state-panel">
      <div className="riwayat-state-icon">{icon}</div>
      <h3 className="riwayat-state-title">{title}</h3>
      <p className="riwayat-state-description">{description}</p>

      {actionLabel && onAction ? (
        <button
          type="button"
          className="dashboard-primary-action riwayat-state-action"
          onClick={onAction}
        >
          {variant === "loading" ? (
            <>
              <RefreshCcw size={16} aria-hidden="true" />
              {actionLabel}
            </>
          ) : variant === "empty" ? (
            <>
              <UploadCloud size={16} aria-hidden="true" />
              {actionLabel}
            </>
          ) : (
            actionLabel
          )}
        </button>
      ) : null}
    </section>
  );
}
