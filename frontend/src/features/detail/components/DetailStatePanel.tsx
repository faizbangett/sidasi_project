type DetailStatePanelProps = {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
};

export function DetailStatePanel({
  title,
  description,
  actionLabel,
  onAction,
}: DetailStatePanelProps) {
  return (
    <section className="dashboard-section detail-state-message">
      <div className="detail-state-message-box">
        <p className="detail-state-message-title">{title}</p>
        <p className="detail-state-message-description">{description}</p>
        <button
          type="button"
          className="dashboard-primary-action"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      </div>
    </section>
  );
}
