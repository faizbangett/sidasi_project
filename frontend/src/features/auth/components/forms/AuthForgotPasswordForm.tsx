import type { Dispatch, FormEvent, SetStateAction } from "react";
import {
  FormField,
  FormSubmitButton,
} from "../../../../shared/components/forms";
import type { ForgotFormState, FormErrors } from "../../types/auth.types";

type AuthForgotPasswordFormProps = {
  forgotForm: ForgotFormState;
  setForgotForm: Dispatch<SetStateAction<ForgotFormState>>;
  errors: FormErrors;
  activeInlineErrors: FormErrors;
  isSubmitting: boolean;
  submitForgotPassword: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

export function AuthForgotPasswordForm({
  forgotForm,
  setForgotForm,
  errors,
  activeInlineErrors,
  isSubmitting,
  submitForgotPassword,
}: AuthForgotPasswordFormProps) {
  return (
    <form className="form" onSubmit={submitForgotPassword}>
      <FormField
        label="Email Terdaftar"
        error={errors.email ?? activeInlineErrors.email}
        value={forgotForm.email}
        onChange={(event) =>
          setForgotForm((prev) => ({ ...prev, email: event.target.value }))
        }
        placeholder="kamu@email.com"
      />

      <FormSubmitButton isLoading={isSubmitting} loadingLabel="Mengirim...">
        Kirim Link Reset
      </FormSubmitButton>
    </form>
  );
}
