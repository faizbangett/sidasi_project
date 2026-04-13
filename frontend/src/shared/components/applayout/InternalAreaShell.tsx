import type { ReactNode } from "react";

type InternalAreaShellProps = {
  header: ReactNode;
  sidebar: ReactNode;
  children: ReactNode;
};

export function InternalAreaShell({
  header,
  sidebar,
  children,
}: InternalAreaShellProps) {
  return (
    <div className="internal-shell">
      {sidebar}

      <div className="internal-shell__main">
        <header className="internal-shell__header">{header}</header>
        <div className="internal-shell__content">{children}</div>
      </div>
    </div>
  );
}
