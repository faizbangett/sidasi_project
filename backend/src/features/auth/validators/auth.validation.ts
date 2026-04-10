export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function getPasswordError(value: string) {
  if (value.length < 8) {
    return "Kata sandi minimal 8 karakter.";
  }

  if (!/[A-Z]/.test(value)) {
    return "Kata sandi harus punya minimal 1 huruf besar.";
  }

  if (!/[a-z]/.test(value)) {
    return "Kata sandi harus punya minimal 1 huruf kecil.";
  }

  if (!/[0-9]/.test(value)) {
    return "Kata sandi harus punya minimal 1 angka.";
  }

  return undefined;
}
