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
    <li>
      {app.company} - {app.position}
      <button type="button" onClick={() => onDelete(app.id)}>
        X
      </button>
      <button type="button" onClick={() => onCycleStatus(app.id)}>
        {app.status}
      </button>
    </li>
  );
}
