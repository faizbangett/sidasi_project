import type { Dispatch, FormEvent, SetStateAction } from "react";
import type {
  ForgotFormState,
  FormErrors,
  LoginFormState,
  RegisterFormState,
  ResetFormState,
} from "../types/auth.types";
import { AuthForgotPasswordForm } from "./forms/AuthForgotPasswordForm";
import { AuthLoginForm } from "./forms/AuthLoginForm";
import { AuthRegisterForm } from "./forms/AuthRegisterForm";
import { AuthResetPasswordForm } from "./forms/AuthResetPasswordForm";

type AuthFormsProps = {
  tab: "login" | "register" | "forgot" | "reset";
  errors: FormErrors;
  activeInlineErrors: FormErrors;
  isSubmitting: boolean;
  registerForm: RegisterFormState;
  setRegisterForm: Dispatch<SetStateAction<RegisterFormState>>;
  loginForm: LoginFormState;
  setLoginForm: Dispatch<SetStateAction<LoginFormState>>;
  forgotForm: ForgotFormState;
  setForgotForm: Dispatch<SetStateAction<ForgotFormState>>;
  resetForm: ResetFormState;
  setResetForm: Dispatch<SetStateAction<ResetFormState>>;
  submitRegister: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  submitLogin: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  submitForgotPassword: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  submitResetPassword: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

export function AuthForms({
  tab,
  errors,
  activeInlineErrors,
  isSubmitting,
  registerForm,
  setRegisterForm,
  loginForm,
  setLoginForm,
  forgotForm,
  setForgotForm,
  resetForm,
  setResetForm,
  submitRegister,
  submitLogin,
  submitForgotPassword,
  submitResetPassword,
}: AuthFormsProps) {
  if (tab === "register") {
    return (
      <AuthRegisterForm
        registerForm={registerForm}
        setRegisterForm={setRegisterForm}
        errors={errors}
        activeInlineErrors={activeInlineErrors}
        isSubmitting={isSubmitting}
        submitRegister={submitRegister}
      />
    );
  }

  if (tab === "login") {
    return (
      <AuthLoginForm
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        errors={errors}
        activeInlineErrors={activeInlineErrors}
        isSubmitting={isSubmitting}
        submitLogin={submitLogin}
      />
    );
  }

  if (tab === "forgot") {
    return (
      <AuthForgotPasswordForm
        forgotForm={forgotForm}
        setForgotForm={setForgotForm}
        errors={errors}
        activeInlineErrors={activeInlineErrors}
        isSubmitting={isSubmitting}
        submitForgotPassword={submitForgotPassword}
      />
    );
  }

  return (
    <AuthResetPasswordForm
      resetForm={resetForm}
      setResetForm={setResetForm}
      errors={errors}
      activeInlineErrors={activeInlineErrors}
      isSubmitting={isSubmitting}
      submitResetPassword={submitResetPassword}
    />
  );
}
