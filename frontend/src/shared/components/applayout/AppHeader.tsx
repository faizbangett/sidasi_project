type AppHeaderProps = {
  appLabel: string;
  userName: string;
  onToggleSidebar?: () => void;
};

export function AppHeader({
  appLabel,
  userName,
  onToggleSidebar,
}: AppHeaderProps) {
  const initials =
    userName
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase() || "U";

  return (
    <div className="app-header">
      <div className="app-header__left">
        {onToggleSidebar && (
          <button
            type="button"
            className="app-header__hamburger"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
          >
            ≡
          </button>
        )}
        <p className="app-header__brand" aria-label="Nama aplikasi">
          {appLabel}
        </p>
      </div>

      <div className="app-header__profile" aria-label="Profil pengguna">
        <span className="app-header__avatar" aria-hidden="true">
          {initials}
        </span>
        <p className="app-header__user">{userName}</p>
      </div>
    </div>
  );
}
