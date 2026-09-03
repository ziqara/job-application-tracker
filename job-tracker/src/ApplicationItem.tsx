import type { JobApplication } from "./types";

interface ApplicationItemProps {
  app: JobApplication;
  onDelete: (id: number) => void;
  onCycleStatus: (id: number) => void;
}

export function ApplicationItem({
  app,
  onDelete,
  onCycleStatus,
}: ApplicationItemProps) {
  return (
    <li className="card">
      <span className="info">
        {app.company} - {app.position}
      </span>
      <button type="button" onClick={() => onDelete(app.id)}>
        X
      </button>
      <button
        className={"badge badge-" + app.status}
        type="button"
        onClick={() => onCycleStatus(app.id)}
      >
        {app.status}
      </button>
    </li>
  );
}
