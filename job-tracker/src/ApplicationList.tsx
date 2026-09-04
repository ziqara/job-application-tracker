import type { JobApplication } from "./types";
import { ApplicationItem } from "./ApplicationItem";
import { Stack } from "@mui/material";

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
    <Stack spacing={1.5}>
      {applications.map((item) => (
        <ApplicationItem
          key={item.id}
          app={item}
          onDelete={onDelete}
          onCycleStatus={onCycleStatus}
        />
      ))}
    </Stack>
  );
}
