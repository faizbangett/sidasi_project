export type AuthTab = "login" | "register" | "forgot" | "reset";

export type FormErrors = Record<string, string>;

export type RegisterFormState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginFormState = {
  email: string;
  password: string;
};

export type ForgotFormState = {
  email: string;
};

export type ResetFormState = {
  token: string;
  newPassword: string;
};

export type AuthApiError = {
  message?: string;
  errors?: FormErrors;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type AuthSession = {
  token: string;
  user: AuthUser;
};
