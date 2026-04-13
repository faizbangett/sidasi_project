import { LoaderCircle } from "lucide-react";
import type { UploadState } from "../hooks/useUploadTAFlow";

type UploadSubmitActionProps = {
  state: UploadState;
  canStart: boolean;
  onStartValidation: () => void;
};

export function UploadSubmitAction({
  state,
  canStart,
  onStartValidation,
}: UploadSubmitActionProps) {
  const actionLabel =
    state === "result" ? "Validasi Ulang Dokumen" : "Mulai Validasi";

  return (
    <div className="upload-submit-row">
      <button
        type="button"
        className="dashboard-primary-action upload-submit-btn"
        onClick={onStartValidation}
        disabled={!canStart}
      >
        {state === "processing" ? (
          <>
            <LoaderCircle
              size={16}
              className="upload-spinner"
              aria-hidden="true"
            />
            Memproses...
          </>
        ) : (
          actionLabel
        )}
      </button>
    </div>
  );
}
