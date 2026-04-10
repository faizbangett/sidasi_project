-- Jalankan file ini saat terkoneksi ke database default 'postgres'.
-- Tujuan: membuat database aplikasi SIDASI.

CREATE DATABASE sidasi_db
  WITH
  OWNER = postgres
  ENCODING = 'UTF8'
  LC_COLLATE = 'English_United States.1252'
  LC_CTYPE = 'English_United States.1252'
  LOCALE_PROVIDER = 'libc'
  TEMPLATE = template0;
