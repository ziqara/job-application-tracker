import type { JobApplication } from "./types";
import { ApplicationItem } from "./ApplicationItem";

interface ApplicationListProps {
  applications: Array<JobApplication>;

  onDelete: (id: number) => void;
  onCycleStatus: (id: number) => void;
}

export function ApplicationList({
  applications,
  onDelete,
  onCycleStatus,
}: ApplicationListProps) {
  return (
    <ul>
      {applications.map((item) => (
        <ApplicationItem
          key={item.id}
          app={item}
          onDelete={onDelete}
          onCycleStatus={onCycleStatus}
        />
      ))}
    </ul>
  );
}
