import type { InputHTMLAttributes, ReactNode } from "react";

type FormFieldProps = {
  label: ReactNode;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function FormField({ label, error, ...inputProps }: FormFieldProps) {
  return (
    <label>
      {label}
      <input {...inputProps} />
      <small>{error}</small>
    </label>
  );
}
