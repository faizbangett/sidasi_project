import type { ButtonHTMLAttributes, ReactNode } from "react";

type FormSubmitButtonProps = {
  isLoading?: boolean;
  loadingLabel: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function FormSubmitButton({
  isLoading = false,
  loadingLabel,
  children,
  disabled,
  ...props
}: FormSubmitButtonProps) {
  return (
    <button disabled={disabled || isLoading} type="submit" {...props}>
      {isLoading ? loadingLabel : children}
    </button>
  );
}
