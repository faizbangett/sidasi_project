import type { ReactNode } from "react";

type SummaryStatCardProps = {
  label: string;
  value: ReactNode;
  note?: ReactNode;
};

export function SummaryStatCard({ label, value, note }: SummaryStatCardProps) {
  return (
    <article className="summary-stat-card">
      <p className="summary-stat-card__label">{label}</p>
      <p className="summary-stat-card__value">{value}</p>
      {note ? <p className="summary-stat-card__note">{note}</p> : null}
    </article>
  );
}
