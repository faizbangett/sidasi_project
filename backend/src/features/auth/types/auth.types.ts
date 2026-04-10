export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
};

export type SafeUser = {
  id: string;
  name: string;
  email: string;
};

export type ValidationErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  newPassword?: string;
};

export type AuthError = {
  status: number;
  message: string;
  errors?: ValidationErrors;
};

export type AuthSuccess<T = unknown> = {
  status: number;
  message: string;
  data?: T;
  token?: string;
};

export type RegisterPayload = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export type LoginPayload = {
  email?: string;
  password?: string;
};

export type ForgotPasswordPayload = {
  email?: string;
};

export type ResetPasswordPayload = {
  token?: string;
  newPassword?: string;
};
