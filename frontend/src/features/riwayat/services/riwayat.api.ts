export type RiwayatScenario = "success" | "empty" | "error";

export type RiwayatRecord = {
  id: string;
  fileName: string;
  validationDate: string;
  score: number;
  status: string;
};

const MOCK_RECORDS: RiwayatRecord[] = [
  {
    id: "1",
    fileName: "Draft_TA_Alfin_Bab1-3.pdf",
    validationDate: "13 Jan 2026",
    score: 65,
    status: "Perlu Banyak Revisi",
  },
  {
    id: "2",
    fileName: "Laporan_Akhir_Rev2.pdf",
    validationDate: "10 Jan 2026",
    score: 95,
    status: "Sangat Baik",
  },
  {
    id: "3",
    fileName: "Bab_3_Metodologi.pdf",
    validationDate: "05 Jan 2026",
    score: 80,
    status: "Cukup Baik",
  },
  {
    id: "4",
    fileName: "Proposal_Alfin_V1.pdf",
    validationDate: "28 Dec 2025",
    score: 50,
    status: "Butuh Perbaikan",
  },
  {
    id: "5",
    fileName: "Isdasi_Bab_1_2_Draft.pdf",
    validationDate: "15 Des 2025",
    score: 75,
    status: "Revisi Minor",
  },
  {
    id: "6",
    fileName: "Bab_4_Hasil_Analisis.pdf",
    validationDate: "12 Des 2025",
    score: 88,
    status: "Cukup Baik",
  },
  {
    id: "7",
    fileName: "Bab_5_Penutup.pdf",
    validationDate: "02 Des 2025",
    score: 91,
    status: "Sangat Baik",
  },
  {
    id: "8",
    fileName: "Lampiran_Fix.pdf",
    validationDate: "28 Nov 2025",
    score: 72,
    status: "Revisi Minor",
  },
  {
    id: "9",
    fileName: "Draft_Final_Review.pdf",
    validationDate: "20 Nov 2025",
    score: 68,
    status: "Revisi Minor",
  },
  {
    id: "10",
    fileName: "Dokumen_Uji_Format.pdf",
    validationDate: "08 Nov 2025",
    score: 59,
    status: "Perlu Banyak Revisi",
  },
  {
    id: "11",
    fileName: "Versi_Awal_TA.pdf",
    validationDate: "31 Oct 2025",
    score: 83,
    status: "Cukup Baik",
  },
  {
    id: "12",
    fileName: "Rancangan_TA_Final.pdf",
    validationDate: "15 Oct 2025",
    score: 77,
    status: "Revisi Minor",
  },
];

function wait(milliseconds: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

export async function fetchRiwayatValidationHistory(
  scenario: RiwayatScenario,
): Promise<RiwayatRecord[]> {
  await wait(1000);

  if (scenario === "error") {
    throw new Error("Gagal mengambil data riwayat validasi.");
  }

  if (scenario === "empty") {
    return [];
  }

  return MOCK_RECORDS;
}
