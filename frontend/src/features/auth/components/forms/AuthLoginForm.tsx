import type { Dispatch, FormEvent, SetStateAction } from "react";
import {
  FormField,
  FormSubmitButton,
} from "../../../../shared/components/forms";
import type { FormErrors, LoginFormState } from "../../types/auth.types";

type AuthLoginFormProps = {
  loginForm: LoginFormState;
  setLoginForm: Dispatch<SetStateAction<LoginFormState>>;
  errors: FormErrors;
  activeInlineErrors: FormErrors;
  isSubmitting: boolean;
  submitLogin: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

export function AuthLoginForm({
  loginForm,
  setLoginForm,
  errors,
  activeInlineErrors,
  isSubmitting,
  submitLogin,
}: AuthLoginFormProps) {
  return (
    <form className="form" onSubmit={submitLogin}>
      <FormField
        label="Email"
        error={errors.email ?? activeInlineErrors.email}
        value={loginForm.email}
        onChange={(event) =>
          setLoginForm((prev) => ({ ...prev, email: event.target.value }))
        }
        placeholder="kamu@email.com"
      />

      <FormField
        label="Kata Sandi"
        error={errors.password ?? activeInlineErrors.password}
        type="password"
        value={loginForm.password}
        onChange={(event) =>
          setLoginForm((prev) => ({ ...prev, password: event.target.value }))
        }
        placeholder="Masukkan kata sandi"
      />

      <FormSubmitButton isLoading={isSubmitting} loadingLabel="Memproses...">
        Masuk
      </FormSubmitButton>
    </form>
  );
}
