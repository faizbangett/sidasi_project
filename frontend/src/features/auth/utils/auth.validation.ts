import type {
  ForgotFormState,
  FormErrors,
  LoginFormState,
  RegisterFormState,
  ResetFormState,
} from "../types/auth.types";

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function getPasswordError(password: string) {
  if (password.length < 8) return "Minimal 8 karakter.";
  if (!/[A-Z]/.test(password)) return "Minimal 1 huruf besar.";
  if (!/[a-z]/.test(password)) return "Minimal 1 huruf kecil.";
  if (!/[0-9]/.test(password)) return "Minimal 1 angka.";
  return "";
}

export function validateRegisterInline(form: RegisterFormState) {
  const next: FormErrors = {};

  if (form.name.length > 0 && form.name.trim().length < 2) {
    next.name = "Nama minimal 2 karakter.";
  }

  if (form.email.length > 0 && !isValidEmail(form.email)) {
    next.email = "Format email belum valid.";
  }

  if (form.password.length > 0) {
    const passwordError = getPasswordError(form.password);
    if (passwordError) next.password = passwordError;
  }

  if (
    form.confirmPassword.length > 0 &&
    form.confirmPassword !== form.password
  ) {
    next.confirmPassword = "Konfirmasi kata sandi tidak sama.";
  }

  return next;
}

export function validateLoginInline(form: LoginFormState) {
  const next: FormErrors = {};

  if (form.email.length > 0 && !isValidEmail(form.email)) {
    next.email = "Format email belum valid.";
  }

  if (form.password.length > 0 && form.password.length < 8) {
    next.password = "Kata sandi terlihat terlalu pendek.";
  }

  return next;
}

export function validateForgotInline(form: ForgotFormState) {
  const next: FormErrors = {};

  if (form.email.length > 0 && !isValidEmail(form.email)) {
    next.email = "Format email belum valid.";
  }

  return next;
}

export function validateResetInline(form: ResetFormState) {
  const next: FormErrors = {};

  if (form.token.length > 0 && form.token.length < 10) {
    next.token = "Token reset tampak belum lengkap.";
  }

  if (form.newPassword.length > 0) {
    const passwordError = getPasswordError(form.newPassword);
    if (passwordError) next.newPassword = passwordError;
  }

  return next;
}
