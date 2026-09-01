import type { JobApplication } from "./types";
import { ApplicationItem } from "./ApplicationItem";

interface ApplicationListProps {
  applications: Array<JobApplication>;
}

export function ApplicationList({ applications }: ApplicationListProps) {
  return (
    <ul>
      {applications.map((item) => (
        <ApplicationItem key={item.id} app={item} />
      ))}
    </ul>
  );
}
