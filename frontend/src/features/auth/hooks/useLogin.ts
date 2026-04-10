import type { Dispatch, FormEvent, SetStateAction } from "react";
import { loginApi } from "../services/auth.api";
import type {
  AuthSession,
  LoginFormState,
  FormErrors,
} from "../types/auth.types";

type UseLoginParams = {
  loginForm: LoginFormState;
  setLoginForm: Dispatch<SetStateAction<LoginFormState>>;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  clearFeedback: () => void;
  normalizeApiError: (error: unknown) => void;
  onLoginSuccess?: (session: AuthSession) => void;
  setServerMessage: Dispatch<SetStateAction<string>>;
  emptyLoginForm: LoginFormState;
  setErrors: Dispatch<SetStateAction<FormErrors>>;
};

export function useLogin({
  loginForm,
  setLoginForm,
  setIsSubmitting,
  clearFeedback,
  normalizeApiError,
  onLoginSuccess,
  setServerMessage,
  emptyLoginForm,
  setErrors,
}: UseLoginParams) {
  async function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    clearFeedback();

    try {
      const data = await loginApi({
        email: loginForm.email.trim(),
        password: loginForm.password,
      });

      setServerMessage(
        `${data.message ?? "Login berhasil."} Halo, ${data.data.name}.`,
      );
      setErrors({});
      onLoginSuccess?.({ token: data.token, user: data.data });
      setLoginForm(emptyLoginForm);
    } catch (error) {
      normalizeApiError(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return { submitLogin };
}
