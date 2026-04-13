import { useEffect, useState } from "react";
import {
  fetchValidationDetail,
  isDetailNotFoundError,
  type DetailValidationRecord,
} from "../services/detail.api";

export type DetailDisplayState =
  | "loading"
  | "success"
  | "file-missing"
  | "not-found"
  | "error";

export function useDetailValidationFlow(recordId: string | null) {
  const [displayState, setDisplayState] =
    useState<DetailDisplayState>("loading");
  const [record, setRecord] = useState<DetailValidationRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadDetail() {
      try {
        setDisplayState("loading");
        setErrorMessage(null);
        setRecord(null);

        const nextRecord = await fetchValidationDetail(recordId);

        if (!active) {
          return;
        }

        setRecord(nextRecord);
        setDisplayState(
          nextRecord.fileMode === "missing" ? "file-missing" : "success",
        );
      } catch (error) {
        if (!active) {
          return;
        }

        if (isDetailNotFoundError(error)) {
          setDisplayState("not-found");
          setErrorMessage(
            "Data validasi tidak ditemukan atau Anda tidak memiliki akses ke dokumen ini.",
          );
        } else {
          setDisplayState("error");
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Terjadi kesalahan saat memuat detail validasi.",
          );
        }
      }
    }

    loadDetail();

    return () => {
      active = false;
    };
  }, [recordId]);

  return {
    displayState,
    record,
    errorMessage,
  };
}
