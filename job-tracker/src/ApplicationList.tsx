import type { JobApplication } from "./types";
import { ApplicationItem } from "./ApplicationItem";

interface ApplicationListProps {
  applications: Array<JobApplication>;

  onDelete: (id: number) => void;
}

export function ApplicationList({
  applications,
  onDelete,
}: ApplicationListProps) {
  return (
    <ul>
      {applications.map((item) => (
        <ApplicationItem key={item.id} app={item} onDelete={onDelete} />
      ))}
    </ul>
  );
}
