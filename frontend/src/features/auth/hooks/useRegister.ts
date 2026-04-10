import type { Dispatch, FormEvent, SetStateAction } from "react";
import { registerApi } from "../services/auth.api";
import type {
  FormErrors,
  LoginFormState,
  RegisterFormState,
  AuthTab,
} from "../types/auth.types";

type UseRegisterParams = {
  registerForm: RegisterFormState;
  setRegisterForm: Dispatch<SetStateAction<RegisterFormState>>;
  setLoginForm: Dispatch<SetStateAction<LoginFormState>>;
  setTab: Dispatch<SetStateAction<AuthTab>>;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  clearFeedback: () => void;
  normalizeApiError: (error: unknown) => void;
  setServerMessage: Dispatch<SetStateAction<string>>;
  emptyRegisterForm: RegisterFormState;
  setErrors: Dispatch<SetStateAction<FormErrors>>;
};

export function useRegister({
  registerForm,
  setRegisterForm,
  setLoginForm,
  setTab,
  setIsSubmitting,
  clearFeedback,
  normalizeApiError,
  setServerMessage,
  emptyRegisterForm,
  setErrors,
}: UseRegisterParams) {
  async function submitRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    clearFeedback();

    try {
      const payload = {
        name: registerForm.name.trim(),
        email: registerForm.email.trim(),
        password: registerForm.password,
        confirmPassword: registerForm.confirmPassword,
      };

      const data = await registerApi(payload);
      setServerMessage(data.message ?? "Akun berhasil dibuat.");
      setErrors({});
      setTab("login");
      setLoginForm({ email: registerForm.email, password: "" });
      setRegisterForm(emptyRegisterForm);
    } catch (error) {
      normalizeApiError(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return { submitRegister };
}
