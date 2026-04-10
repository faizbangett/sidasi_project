# PostgreSQL + pgAdmin 4 Quickstart (SIDASI)

Panduan ini untuk persiapan database pertama kali tanpa Prisma.

## 1) Cek PostgreSQL service

1. Buka pgAdmin 4.
2. Di panel kiri, pastikan server `PostgreSQL 16` statusnya connected.
3. Jika diminta password, masukkan password user `postgres`.

## 2) Buat database aplikasi

1. Klik kanan database default `postgres`.
2. Pilih **Query Tool**.
3. Buka file `backend/database/00_create_database.sql`.
4. Jalankan (ikon ▶ / F5).
5. Refresh node **Databases**. Pastikan `sidasi_db` muncul.

Jika muncul error `database "sidasi_db" already exists`, itu normal (berarti sudah pernah dibuat).

## 3) Buat schema/tabel

1. Klik database `sidasi_db`.
2. Buka **Query Tool**.
3. Buka file `backend/database/01_init_schema.sql`.
4. Jalankan (F5).
5. Cek di `sidasi_db -> Schemas -> public -> Tables`:
   - `users`
   - `password_reset_tokens`

## 4) Verifikasi cepat dari Query Tool

Pastikan query ini menghasilkan data tabel:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

Cek struktur user:

```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'users'
ORDER BY ordinal_position;
```

## 5) Siapkan environment backend

Buat file `.env` di folder `backend` dengan nilai contoh:

```env
PORT=5000
FRONTEND_ORIGIN=http://localhost:5173
DATABASE_URL=postgresql://postgres:<PASSWORD_ANDA>@localhost:5432/sidasi_db
JWT_SECRET=ganti_dengan_secret_panjang_minimal_32_karakter
```

Catatan:

- Ganti `<PASSWORD_ANDA>` sesuai password user postgres.
- Jangan commit file `.env` ke git.

## 6) Uji koneksi manual di pgAdmin

Jalankan query berikut pada database `sidasi_db`:

```sql
SELECT current_database(), current_user, NOW();
```

Jika keluar baris hasil, database sudah siap dipakai backend.

## 7) Persiapan Postman (opsional, sebelum coding repository DB)

Buat Environment:

- `baseUrl` = `http://localhost:5000`
- `token` = (kosong dulu)

Request minimal:

- `POST {{baseUrl}}/auth/register`
- `POST {{baseUrl}}/auth/login`
- `GET {{baseUrl}}/auth/me` (Authorization: Bearer {{token}})

---

Setelah ini, langkah berikutnya adalah mengganti repository in-memory ke repository PostgreSQL menggunakan package `pg` yang sudah terpasang.
