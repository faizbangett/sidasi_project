import { useEffect, useMemo, useState } from "react";
import {
  fetchRiwayatValidationHistory,
  type RiwayatRecord,
  type RiwayatScenario,
} from "../services/riwayat.api";

export type RiwayatSortOrder = "newest" | "oldest" | "score-desc" | "score-asc";
export type RiwayatDisplayState =
  | "loading"
  | "table"
  | "empty"
  | "no-results"
  | "error";

const PAGE_SIZE = 5;

function resolveScenario(): RiwayatScenario {
  const params = new URLSearchParams(window.location.search);
  const nextScenario = params.get("riwayat");

  if (nextScenario === "empty" || nextScenario === "error") {
    return nextScenario;
  }

  return "success";
}

function compareByDate(a: RiwayatRecord, b: RiwayatRecord, direction: 1 | -1) {
  return a.validationDate.localeCompare(b.validationDate) * direction;
}

export function useRiwayatValidationFlow() {
  const [records, setRecords] = useState<RiwayatRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<RiwayatSortOrder>("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const scenario = useMemo(resolveScenario, []);

  useEffect(() => {
    async function loadHistory() {
      try {
        setLoading(true);
        setErrorMessage(null);
        const nextRecords = await fetchRiwayatValidationHistory(scenario);
        setRecords(nextRecords);
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat memuat data riwayat.",
        );
        setRecords([]);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, [scenario]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOrder]);

  const filteredRecords = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();

    const nextRecords = records.filter((record) => {
      if (!normalizedQuery) {
        return true;
      }

      return record.fileName.toLowerCase().includes(normalizedQuery);
    });

    const sortedRecords = [...nextRecords];

    switch (sortOrder) {
      case "oldest":
        sortedRecords.sort((a, b) => compareByDate(a, b, 1));
        break;
      case "score-desc":
        sortedRecords.sort((a, b) => b.score - a.score);
        break;
      case "score-asc":
        sortedRecords.sort((a, b) => a.score - b.score);
        break;
      default:
        sortedRecords.sort((a, b) => compareByDate(a, b, -1));
        break;
    }

    return sortedRecords;
  }, [records, searchTerm, sortOrder]);

  const totalRecords = filteredRecords.length;
  const pageCount = Math.max(1, Math.ceil(totalRecords / PAGE_SIZE));
  const safePage = Math.min(currentPage, pageCount);
  const startIndex = totalRecords === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const endIndex = Math.min(totalRecords, safePage * PAGE_SIZE);
  const visibleRecords = filteredRecords.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const displayState: RiwayatDisplayState = loading
    ? "loading"
    : errorMessage
      ? "error"
      : records.length === 0
        ? "empty"
        : filteredRecords.length === 0
          ? "no-results"
          : "table";

  function clearSearch() {
    setSearchTerm("");
  }

  function retry() {
    setLoading(true);
    setErrorMessage(null);

    fetchRiwayatValidationHistory(scenario)
      .then((nextRecords) => {
        setRecords(nextRecords);
      })
      .catch((error) => {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat memuat data riwayat.",
        );
        setRecords([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return {
    displayState,
    loading,
    errorMessage,
    searchTerm,
    sortOrder,
    records,
    filteredRecords,
    visibleRecords,
    totalRecords,
    pageCount,
    currentPage: safePage,
    startIndex,
    endIndex,
    setSearchTerm,
    setSortOrder,
    setCurrentPage,
    clearSearch,
    retry,
  };
}
