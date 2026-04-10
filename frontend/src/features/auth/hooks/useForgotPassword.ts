import type { Dispatch, FormEvent, SetStateAction } from "react";
import { forgotPasswordApi } from "../services/auth.api";
import type { AuthTab, ForgotFormState, FormErrors } from "../types/auth.types";

type UseForgotPasswordParams = {
  forgotForm: ForgotFormState;
  setForgotForm: Dispatch<SetStateAction<ForgotFormState>>;
  setTab: Dispatch<SetStateAction<AuthTab>>;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  clearFeedback: () => void;
  normalizeApiError: (error: unknown) => void;
  setServerMessage: Dispatch<SetStateAction<string>>;
  emptyForgotForm: ForgotFormState;
  setErrors: Dispatch<SetStateAction<FormErrors>>;
};

export function useForgotPassword({
  forgotForm,
  setForgotForm,
  setTab,
  setIsSubmitting,
  clearFeedback,
  normalizeApiError,
  setServerMessage,
  emptyForgotForm,
  setErrors,
}: UseForgotPasswordParams) {
  async function submitForgotPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    clearFeedback();

    try {
      const data = await forgotPasswordApi({ email: forgotForm.email.trim() });
      setServerMessage(data.message ?? "Link reset berhasil dikirim.");
      setErrors({});
      setForgotForm(emptyForgotForm);
      setTab("reset");
    } catch (error) {
      normalizeApiError(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return { submitForgotPassword };
}
