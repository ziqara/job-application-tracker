import type { JobApplication } from "./types";

interface ApplicationItemProps {
  app: JobApplication;
}

export function ApplicationItem({ app }: ApplicationItemProps) {
  return (
    <li>
      {app.company} - {app.position} - {app.status}
    </li>
  );
}
