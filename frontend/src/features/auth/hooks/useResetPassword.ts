import type { Dispatch, FormEvent, SetStateAction } from "react";
import { resetPasswordApi } from "../services/auth.api";
import type { AuthTab, FormErrors, ResetFormState } from "../types/auth.types";

type UseResetPasswordParams = {
  resetForm: ResetFormState;
  setResetForm: Dispatch<SetStateAction<ResetFormState>>;
  setTab: Dispatch<SetStateAction<AuthTab>>;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  clearFeedback: () => void;
  normalizeApiError: (error: unknown) => void;
  setServerMessage: Dispatch<SetStateAction<string>>;
  emptyResetForm: ResetFormState;
  setErrors: Dispatch<SetStateAction<FormErrors>>;
};

export function useResetPassword({
  resetForm,
  setResetForm,
  setTab,
  setIsSubmitting,
  clearFeedback,
  normalizeApiError,
  setServerMessage,
  emptyResetForm,
  setErrors,
}: UseResetPasswordParams) {
  async function submitResetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    clearFeedback();

    try {
      const data = await resetPasswordApi({
        token: resetForm.token.trim(),
        newPassword: resetForm.newPassword,
      });

      setServerMessage(data.message ?? "Kata sandi berhasil diperbarui.");
      setErrors({});
      setResetForm(emptyResetForm);
      setTab("login");
    } catch (error) {
      normalizeApiError(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return { submitResetPassword };
}
