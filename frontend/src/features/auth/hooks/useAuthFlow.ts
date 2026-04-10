import { useMemo, useState } from "react";
import type {
  AuthApiError,
  AuthSession,
  AuthTab,
  ForgotFormState,
  FormErrors,
  LoginFormState,
  RegisterFormState,
  ResetFormState,
} from "../types/auth.types";
import { useForgotPassword } from "./useForgotPassword";
import { useLogin } from "./useLogin";
import { useRegister } from "./useRegister";
import { useResetPassword } from "./useResetPassword";
import {
  validateForgotInline,
  validateLoginInline,
  validateRegisterInline,
  validateResetInline,
} from "../utils/auth.validation";

const emptyRegisterForm: RegisterFormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const emptyLoginForm: LoginFormState = {
  email: "",
  password: "",
};

const emptyForgotForm: ForgotFormState = {
  email: "",
};

const emptyResetForm: ResetFormState = {
  token: "",
  newPassword: "",
};

type UseAuthFlowOptions = {
  onLoginSuccess?: (session: AuthSession) => void;
};

export function useAuthFlow(options: UseAuthFlowOptions = {}) {
  const [tab, setTab] = useState<AuthTab>("login");
  const [registerForm, setRegisterForm] =
    useState<RegisterFormState>(emptyRegisterForm);
  const [loginForm, setLoginForm] = useState<LoginFormState>(emptyLoginForm);
  const [forgotForm, setForgotForm] =
    useState<ForgotFormState>(emptyForgotForm);
  const [resetForm, setResetForm] = useState<ResetFormState>(emptyResetForm);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  const registerInlineErrors = useMemo(
    () => validateRegisterInline(registerForm),
    [registerForm],
  );

  const loginInlineErrors = useMemo(
    () => validateLoginInline(loginForm),
    [loginForm],
  );

  const forgotInlineErrors = useMemo(
    () => validateForgotInline(forgotForm),
    [forgotForm],
  );

  const resetInlineErrors = useMemo(
    () => validateResetInline(resetForm),
    [resetForm],
  );

  const activeInlineErrors =
    tab === "register"
      ? registerInlineErrors
      : tab === "login"
        ? loginInlineErrors
        : tab === "forgot"
          ? forgotInlineErrors
          : resetInlineErrors;

  function clearFeedback() {
    setServerMessage("");
    setErrors({});
  }

  function onTabChange(nextTab: AuthTab) {
    setTab(nextTab);
    clearFeedback();
  }

  function normalizeApiError(error: unknown) {
    const apiError = error as AuthApiError;
    setServerMessage(apiError.message ?? "Terjadi kendala pada server.");
    setErrors(apiError.errors ?? {});
  }

  const { submitRegister } = useRegister({
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
  });

  const { submitLogin } = useLogin({
    loginForm,
    setLoginForm,
    setIsSubmitting,
    clearFeedback,
    normalizeApiError,
    onLoginSuccess: options.onLoginSuccess,
    setServerMessage,
    emptyLoginForm,
    setErrors,
  });

  const { submitForgotPassword } = useForgotPassword({
    forgotForm,
    setForgotForm,
    setTab,
    setIsSubmitting,
    clearFeedback,
    normalizeApiError,
    setServerMessage,
    emptyForgotForm,
    setErrors,
  });

  const { submitResetPassword } = useResetPassword({
    resetForm,
    setResetForm,
    setTab,
    setIsSubmitting,
    clearFeedback,
    normalizeApiError,
    setServerMessage,
    emptyResetForm,
    setErrors,
  });

  return {
    tab,
    onTabChange,
    registerForm,
    setRegisterForm,
    loginForm,
    setLoginForm,
    forgotForm,
    setForgotForm,
    resetForm,
    setResetForm,
    errors,
    activeInlineErrors,
    isSubmitting,
    serverMessage,
    submitRegister,
    submitLogin,
    submitForgotPassword,
    submitResetPassword,
  };
}
