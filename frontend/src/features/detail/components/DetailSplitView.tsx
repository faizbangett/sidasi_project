import type { ReactNode } from "react";

type DetailSplitViewProps = {
  leftTitle: string;
  rightTitle: string;
  leftContent: ReactNode;
  rightContent: ReactNode;
};

export function DetailSplitView({
  leftTitle,
  rightTitle,
  leftContent,
  rightContent,
}: DetailSplitViewProps) {
  return (
    <section className="dashboard-section detail-split-view">
      <div className="detail-split-column">
        <p className="detail-column-title">{leftTitle}</p>
        {leftContent}
      </div>
      <div className="detail-split-column">
        <p className="detail-column-title">{rightTitle}</p>
        {rightContent}
      </div>
    </section>
  );
}
