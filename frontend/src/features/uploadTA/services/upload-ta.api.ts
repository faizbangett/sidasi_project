export type ValidationProgress = {
  value: number;
  message: string;
};

export type ValidationIssue = {
  page: number;
  category: "Visual Filter" | "Style Filter" | "Content Filter";
  message: string;
  severity: "high" | "medium" | "low";
};

export type ValidationResultSummary = {
  fileName: string;
  score: number;
  status: string;
  issues: ValidationIssue[];
};

function wait(milliseconds: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

export async function uploadDraftTA(file: File) {
  return {
    jobId: `local-${Date.now()}`,
    fileName: file.name,
  };
}

export async function simulateValidationProgress(
  onProgress: (progress: ValidationProgress) => void,
) {
  const checkpoints: ValidationProgress[] = [
    { value: 20, message: "Memverifikasi struktur file PDF..." },
    { value: 45, message: "Mengekstrak properti visual dokumen..." },
    { value: 72, message: "Membandingkan dokumen dengan aturan KTI..." },
    { value: 100, message: "Validasi selesai. Hasil siap ditampilkan." },
  ];

  for (const checkpoint of checkpoints) {
    await wait(900);
    onProgress(checkpoint);
  }
}

export async function getValidationResultSummary(
  file: File,
): Promise<ValidationResultSummary> {
  await wait(500);

  return {
    fileName: file.name,
    score: 65,
    status: "Perlu Banyak Revisi",
    issues: [
      {
        page: 1,
        category: "Visual Filter",
        message:
          "Margin atas terdeteksi 3cm. Aturan KTI POLIJE mensyaratkan 4cm.",
        severity: "high",
      },
      {
        page: 9,
        category: "Style Filter",
        message: "Jarak keterangan tabel tidak sesuai. Ubah menjadi 1 spasi.",
        severity: "high",
      },
      {
        page: 12,
        category: "Content Filter",
        message: "Penulisan format sub-bab terdeteksi tidak valid.",
        severity: "medium",
      },
    ],
  };
}
