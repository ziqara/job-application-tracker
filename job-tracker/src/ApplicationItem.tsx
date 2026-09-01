import type { JobApplication } from "./types";

interface ApplicationItemProps {
  app: JobApplication;
  onDelete: (id: number) => void;
}

export function ApplicationItem({ app, onDelete }: ApplicationItemProps) {
  return (
    <li>
      {app.company} - {app.position} - {app.status}
      <button type="button" onClick={() => onDelete(app.id)}>
        X
      </button>
    </li>
  );
}
