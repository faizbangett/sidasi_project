import type { Dispatch, FormEvent, SetStateAction } from "react";
import {
  FormField,
  FormSubmitButton,
} from "../../../../shared/components/forms";
import type { FormErrors, ResetFormState } from "../../types/auth.types";

type AuthResetPasswordFormProps = {
  resetForm: ResetFormState;
  setResetForm: Dispatch<SetStateAction<ResetFormState>>;
  errors: FormErrors;
  activeInlineErrors: FormErrors;
  isSubmitting: boolean;
  submitResetPassword: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

export function AuthResetPasswordForm({
  resetForm,
  setResetForm,
  errors,
  activeInlineErrors,
  isSubmitting,
  submitResetPassword,
}: AuthResetPasswordFormProps) {
  return (
    <form className="form" onSubmit={submitResetPassword}>
      <FormField
        label="Token Reset"
        error={errors.token ?? activeInlineErrors.token}
        value={resetForm.token}
        onChange={(event) =>
          setResetForm((prev) => ({ ...prev, token: event.target.value }))
        }
        placeholder="Tempel token dari email/log server"
      />

      <FormField
        label="Kata Sandi Baru"
        error={errors.newPassword ?? activeInlineErrors.newPassword}
        type="password"
        value={resetForm.newPassword}
        onChange={(event) =>
          setResetForm((prev) => ({ ...prev, newPassword: event.target.value }))
        }
        placeholder="Minimal 8 karakter"
      />

      <FormSubmitButton isLoading={isSubmitting} loadingLabel="Menyimpan...">
        Simpan Kata Sandi Baru
      </FormSubmitButton>
    </form>
  );
}
