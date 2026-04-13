import type { DetailValidationRevision } from "../services/detail.api";

type DetailRevisionListProps = {
  revisions: DetailValidationRevision[];
};

function severityClass(severity: DetailValidationRevision["severity"]) {
  if (severity === "high") return "is-high";
  if (severity === "medium") return "is-medium";
  return "is-low";
}

export function DetailRevisionList({ revisions }: DetailRevisionListProps) {
  return (
    <div className="detail-revision-list">
      {revisions.map((revision) => (
        <article
          key={`${revision.page}-${revision.category}-${revision.message}`}
          className="detail-revision-item"
        >
          <div
            className={`detail-revision-dot ${severityClass(revision.severity)}`}
            aria-hidden="true"
          />
          <div>
            <p className="detail-revision-title">
              Halaman {revision.page} [{revision.category}]
            </p>
            <p className="detail-revision-message">{revision.message}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
