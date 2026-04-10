# Testing Backend Auth dengan PostgreSQL + Postman

Panduan ini untuk testing endpoint auth backend yang sudah terintegrasi dengan database PostgreSQL.

## 1) Pastikan Database Siap

1. Buka pgAdmin 4.
2. Verifikasi database `sidasi_db` ada dan tabel `users` kosong (atau bersihkan sebelum test):

```sql
DELETE FROM password_reset_tokens;
DELETE FROM users;
```

## 2) Setup File .env Backend

File `.env` sudah ada di `backend/.env` dengan contoh:

```env
PORT=5000
FRONTEND_ORIGIN=http://localhost:5173
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/sidasi_db
JWT_SECRET=your_secret_jwt_key_minimize_this_change_to_production_later_32_chars_min
```

**Catatan:** Ganti password postgres sesuai dengan password lokal kamu di mesin.

## 3) Jalankan Backend Server

Di terminal:

```bash
cd backend
npm install  # jika belum install package pg
npm run dev
```

Output yang diharapkan:

```
[Server] running at http://localhost:5000
```

## 4) Import Postman Collection

1. Buka Postman.
2. Klik **Import** → pilih file `backend/database/SIDASI_Auth_API.postman_collection.json`.
3. Pilih Environment atau buat baru dengan variable:
   - `baseUrl` = `http://localhost:5000`
   - `token` = (kosong, akan terisi saat login)

Atau manual:

- Klik Settings ⚙ → Environments → Create → **SIDASI Environment**:
  - `baseUrl` = `http://localhost:5000`
  - `token` = (kosong)

## 5) Test Step by Step

### Step 1: Health Check

1. Buka request **Health Check**.
2. Klik **Send**.
3. Harapan: Kode 200, response menampilkan list route.

### Step 2: Register User Baru

1. Buka request **Register**.
2. Body sudah ada contoh (email: budi@example.com).
3. Klik **Send**.
4. Harapan:
   - Kode: 201
   - Message: "Akun berhasil dibuat. Silakan login."
   - Di pgAdmin, query `SELECT * FROM users;` menampilkan user baru.

### Step 3: Login

1. Buka request **Login**.
2. Klik **Send**.
3. Harapan:
   - Kode: 200
   - Response ada `token` (string panjang).
   - Token otomatis disimpan di environment variable `{{token}}`.

**Testing invalid credentials:**

Ubah password ke "WrongPassword", klik Send → Harapan Kode 401 "Email atau kata sandi tidak cocok."

### Step 4: Get Current User (Me)

1. Buka request **Get Current User (Me)**.
2. Header Authorization sudah ada: `Bearer {{token}}`.
3. Klik **Send**.
4. Harapan:
   - Kode: 200
   - Response data: `{ "id": "...", "name": "Budi Santoso", "email": "budi@example.com" }`.

**Testing expired/invalid token:**

Ubah token di environment jadi "invalid_token", klik Send:

- Harapan Kode 401 "Token tidak valid atau sudah kedaluwarsa."

### Step 5: Forgot Password

1. Buka request **Forgot Password**.
2. Body ada email: `budi@example.com`.
3. Klik **Send**.
4. Harapan:
   - Kode: 200
   - Message: "Jika email terdaftar, link reset kata sandi sudah kami kirim. Cek inbox kamu."
   - **Penting:** Buka console server terminal, cari log `[ResetToken]`:
     ```
     [ResetToken] budi@example.com -> abc123def456...
     ```
   - Copy token tersebut (string panjang setelah ->).

### Step 6: Reset Password

1. Buka request **Reset Password**.
2. Di body, ganti `PASTE_RESET_TOKEN_FROM_CONSOLE_HERE` dengan token dari Step 5.
3. Ubah `newPassword` sesuai selera (harus 8+ karakter, Ada huruf besar + kecil + angka).
4. Klik **Send**.
5. Harapan:
   - Kode: 200
   - Message: "Kata sandi berhasil diperbarui. Silakan login ulang."
   - Di database, password user berubah.

**Testing dengan token expired:**

Tunggu ~15 menit (RESET_TOKEN_TTL_MS = 10 menit + buffer). Klik Send lagi:

- Harapan Kode 400 "Token reset tidak valid atau sudah kedaluwarsa."

## 6) Verifikasi Database

Cek struktur data yang tersimpan:

```sql
SELECT id, name, email, password_hash, created_at FROM users;
SELECT token, email, expires_at FROM password_reset_tokens;
```

## 7) Common Issues

| Error                                        | Sebab                       | Solusi                                              |
| -------------------------------------------- | --------------------------- | --------------------------------------------------- |
| `Error: connect ECONNREFUSED 127.0.0.1:5432` | PostgreSQL tidak running    | Buka pgAdmin atau `pg_ctl start`                    |
| `FATAL: password authentication failed`      | Password DATABASE_URL salah | Update `.env` dengan password postgres yang benar   |
| Token not saved in env                       | Test script Postman error   | Pastikan Login response punya `token` field         |
| Forgot-password tidak print token            | Server error                | Cek console server, buka issue jika ada stack trace |

## 8) Lanjut: Integrasi Frontend

Setelah backend auth stable + database jalan, frontend sudah siap (sudah punya API client).

Cukup jalankan:

```bash
cd frontend
npm run dev
```

Frontend akan hit `http://localhost:5000` (API_BASE_URL sudah dikonfigurasi).

Test flow end-to-end:

1. Buka http://localhost:5173 → AuthPage.
2. Register user baru → Database insert.
3. Login → Get token → Dashboard muncul.
4. Logout → AuthPage lagi.

---

Jika ada issue, cek apakah:

1. Server backend running (`npm run dev` di folder backend).
2. Database connection string benar di `.env`.
3. Tabel users/password_reset_tokens ada di pgAdmin.
4. Postman token variable terupdate setelah login.
