import { useMemo, useRef, useState } from "react";
import type { ChangeEvent, DragEvent, KeyboardEvent, RefObject } from "react";
import {
  getValidationResultSummary,
  simulateValidationProgress,
  uploadDraftTA,
  type ValidationResultSummary,
} from "../services/upload-ta.api";

export type UploadState = "idle" | "selected" | "processing" | "result";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

function formatBytes(bytes: number) {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${bytes} B`;
}

export function useUploadTAFlow() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [state, setState] = useState<UploadState>("idle");
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationResult, setValidationResult] =
    useState<ValidationResultSummary | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const canStart = Boolean(selectedFile) && state !== "processing";

  const helperText = useMemo(() => {
    if (!selectedFile) {
      return "Format yang didukung: .pdf | Maksimal ukuran file: 10MB";
    }

    return `Ukuran file: ${formatBytes(selectedFile.size)}`;
  }, [selectedFile]);

  function validatePdfFile(file: File) {
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setErrorMessage("Hanya file PDF yang dapat divalidasi.");
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage("Ukuran file melebihi batas 10MB.");
      return false;
    }

    setErrorMessage(null);
    return true;
  }

  function handleChooseFile(file: File | null) {
    if (!file) {
      return;
    }

    if (!validatePdfFile(file)) {
      return;
    }

    setSelectedFile(file);
    setState("selected");
    setProgress(0);
    setStatusMessage("");
    setValidationResult(null);
  }

  function openFilePicker() {
    if (state === "processing") {
      return;
    }

    fileInputRef.current?.click();
  }

  function onFileInputChange(event: ChangeEvent<HTMLInputElement>) {
    const nextFile = event.target.files?.[0] ?? null;
    handleChooseFile(nextFile);
  }

  function onDragEnter(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    if (state === "processing") {
      return;
    }

    setIsDragging(true);
  }

  function onDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function onDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (state === "processing") {
      return;
    }

    setIsDragging(false);
    const nextFile = event.dataTransfer.files?.[0] ?? null;
    handleChooseFile(nextFile);
  }

  function onDropzoneKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFilePicker();
    }
  }

  async function onStartValidation() {
    if (!selectedFile || state === "processing") {
      return;
    }

    setState("processing");
    setProgress(0);
    setStatusMessage("Menyiapkan proses validasi dokumen...");

    await uploadDraftTA(selectedFile);
    await simulateValidationProgress((checkpoint) => {
      setProgress(checkpoint.value);
      setStatusMessage(checkpoint.message);
    });

    const resultSummary = await getValidationResultSummary(selectedFile);
    setValidationResult(resultSummary);
    setState("result");
  }

  function onResetFile() {
    setSelectedFile(null);
    setState("idle");
    setProgress(0);
    setStatusMessage("");
    setErrorMessage(null);
    setIsDragging(false);
    setValidationResult(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return {
    selectedFile,
    state,
    isDragging,
    progress,
    statusMessage,
    errorMessage,
    validationResult,
    canStart,
    helperText,
    fileInputRef: fileInputRef as RefObject<HTMLInputElement>,
    onFileInputChange,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDrop,
    onDropzoneKeyDown,
    onStartValidation,
    onResetFile,
    openFilePicker,
  };
}
