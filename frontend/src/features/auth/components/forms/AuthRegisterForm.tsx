import type { Dispatch, FormEvent, SetStateAction } from "react";
import {
  FormField,
  FormSubmitButton,
} from "../../../../shared/components/forms";
import type { FormErrors, RegisterFormState } from "../../types/auth.types";

type AuthRegisterFormProps = {
  registerForm: RegisterFormState;
  setRegisterForm: Dispatch<SetStateAction<RegisterFormState>>;
  errors: FormErrors;
  activeInlineErrors: FormErrors;
  isSubmitting: boolean;
  submitRegister: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

export function AuthRegisterForm({
  registerForm,
  setRegisterForm,
  errors,
  activeInlineErrors,
  isSubmitting,
  submitRegister,
}: AuthRegisterFormProps) {
  return (
    <form className="form" onSubmit={submitRegister}>
      <FormField
        label="Nama"
        error={errors.name ?? activeInlineErrors.name}
        value={registerForm.name}
        onChange={(event) =>
          setRegisterForm((prev) => ({ ...prev, name: event.target.value }))
        }
        placeholder="Nama lengkap"
      />

      <FormField
        label="Email"
        error={errors.email ?? activeInlineErrors.email}
        value={registerForm.email}
        onChange={(event) =>
          setRegisterForm((prev) => ({ ...prev, email: event.target.value }))
        }
        placeholder="kamu@email.com"
      />

      <FormField
        label="Kata Sandi"
        error={errors.password ?? activeInlineErrors.password}
        type="password"
        value={registerForm.password}
        onChange={(event) =>
          setRegisterForm((prev) => ({ ...prev, password: event.target.value }))
        }
        placeholder="Minimal 8 karakter"
      />

      <FormField
        label="Konfirmasi Kata Sandi"
        error={errors.confirmPassword ?? activeInlineErrors.confirmPassword}
        type="password"
        value={registerForm.confirmPassword}
        onChange={(event) =>
          setRegisterForm((prev) => ({
            ...prev,
            confirmPassword: event.target.value,
          }))
        }
        placeholder="Ketik ulang kata sandi"
      />

      <FormSubmitButton isLoading={isSubmitting} loadingLabel="Menyimpan...">
        Buat Akun
      </FormSubmitButton>
    </form>
  );
}
