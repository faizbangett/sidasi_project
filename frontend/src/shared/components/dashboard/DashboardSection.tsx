import type { HTMLAttributes, ReactNode } from "react";

type DashboardSectionProps = {
  title: string;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>;

export function DashboardSection({
  title,
  children,
  className,
  ...props
}: DashboardSectionProps) {
  const sectionClassName = className
    ? `dashboard-section ${className}`
    : "dashboard-section";

  return (
    <section className={sectionClassName} {...props}>
      <h2 className="dashboard-section__title">{title}</h2>
      <div className="dashboard-section__content">{children}</div>
    </section>
  );
}
