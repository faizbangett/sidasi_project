export type DetailFileMode = "available" | "missing";

export type DetailValidationRevision = {
  page: number;
  category: string;
  message: string;
  severity: "high" | "medium" | "low";
};

export type DetailValidationRecord = {
  id: string;
  fileName: string;
  validationDate: string;
  score: number;
  status: string;
  fileMode: DetailFileMode;
  revisions: DetailValidationRevision[];
  summary: string;
};

export class DetailNotFoundError extends Error {
  status = 404;

  constructor(
    message = "Data validasi tidak ditemukan atau Anda tidak memiliki akses ke dokumen ini.",
  ) {
    super(message);
    this.name = "DetailNotFoundError";
  }
}

const DETAIL_DB: Record<string, DetailValidationRecord> = {
  "1": {
    id: "1",
    fileName: "Draft_TA_Alfin_Bab1-3.pdf",
    validationDate: "13 Jan 2026",
    score: 65,
    status: "Perlu Banyak Revisi",
    fileMode: "available",
    summary:
      "Laporan ini masih memerlukan perbaikan pada margin dan format tabel.",
    revisions: [
      {
        page: 1,
        category: "Visual Filter",
        message: "Margin Atas terdeteksi 3cm. Seharusnya 4cm.",
        severity: "high",
      },
      {
        page: 9,
        category: "Style Filter",
        message: "Jarak keterangan tabel tidak sesuai.",
        severity: "high",
      },
    ],
  },
  "2": {
    id: "2",
    fileName: "Laporan_Akhir_Rev2.pdf",
    validationDate: "10 Jan 2026",
    score: 95,
    status: "Sangat Baik",
    fileMode: "available",
    summary: "Dokumen telah sesuai pedoman dan hanya menyisakan catatan minor.",
    revisions: [
      {
        page: 3,
        category: "Style Filter",
        message: "Penomoran daftar pustaka konsisten.",
        severity: "low",
      },
      {
        page: 11,
        category: "Content Filter",
        message: "Tidak ada pelanggaran substansi utama.",
        severity: "low",
      },
    ],
  },
  "3": {
    id: "3",
    fileName: "Bab_3_Metodologi.pdf",
    validationDate: "05 Jan 2026",
    score: 80,
    status: "Cukup Baik",
    fileMode: "missing",
    summary:
      "Data revisi masih tersedia, tetapi file PDF asli sudah tidak ada di server.",
    revisions: [
      {
        page: 4,
        category: "Visual Filter",
        message: "Struktur heading perlu dirapikan.",
        severity: "medium",
      },
      {
        page: 7,
        category: "Style Filter",
        message: "Spacing paragraf perlu diseragamkan.",
        severity: "medium",
      },
    ],
  },
  "4": {
    id: "4",
    fileName: "Proposal_Alfin_V1.pdf",
    validationDate: "28 Dec 2025",
    score: 50,
    status: "Butuh Perbaikan",
    fileMode: "available",
    summary:
      "Dokumen awal proposal sudah dibaca tetapi banyak aturan format yang belum terpenuhi.",
    revisions: [
      {
        page: 2,
        category: "Content Filter",
        message: "Sub-bab belum mengikuti format yang disarankan.",
        severity: "high",
      },
    ],
  },
  "5": {
    id: "5",
    fileName: "Isdasi_Bab_1_2_Draft.pdf",
    validationDate: "15 Des 2025",
    score: 75,
    status: "Revisi Minor",
    fileMode: "available",
    summary:
      "Arsip ini dapat dibuka normal, namun tetap memiliki beberapa catatan revisi.",
    revisions: [
      {
        page: 1,
        category: "Visual Filter",
        message: "Margin kiri dan kanan masih perlu penyesuaian.",
        severity: "medium",
      },
      {
        page: 5,
        category: "Content Filter",
        message: "Keterangan sub-bab masih perlu perbaikan kecil.",
        severity: "medium",
      },
    ],
  },
};

function wait(milliseconds: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

export async function fetchValidationDetail(
  recordId: string | null,
): Promise<DetailValidationRecord> {
  await wait(1000);

  if (!recordId || !(recordId in DETAIL_DB)) {
    throw new DetailNotFoundError();
  }

  return DETAIL_DB[recordId];
}

export function isDetailNotFoundError(error: unknown) {
  return (
    error instanceof DetailNotFoundError ||
    (typeof error === "object" &&
      error !== null &&
      "status" in error &&
      (error as { status?: number }).status === 404)
  );
}
