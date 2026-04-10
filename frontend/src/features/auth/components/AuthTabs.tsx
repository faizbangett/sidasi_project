import type { AuthTab } from "../types/auth.types";

type AuthTabsProps = {
  tab: AuthTab;
  onTabChange: (tab: AuthTab) => void;
};

export function AuthTabs({ tab, onTabChange }: AuthTabsProps) {
  return (
    <div className="tabs">
      <button
        type="button"
        className={tab === "login" ? "tab active" : "tab"}
        onClick={() => onTabChange("login")}
      >
        Login
      </button>
      <button
        type="button"
        className={tab === "register" ? "tab active" : "tab"}
        onClick={() => onTabChange("register")}
      >
        Daftar
      </button>
      <button
        type="button"
        className={tab === "forgot" ? "tab active" : "tab"}
        onClick={() => onTabChange("forgot")}
      >
        Lupa Password
      </button>
      <button
        type="button"
        className={tab === "reset" ? "tab active" : "tab"}
        onClick={() => onTabChange("reset")}
      >
        Reset
      </button>
    </div>
  );
}
