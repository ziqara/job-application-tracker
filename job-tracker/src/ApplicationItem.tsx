import type { JobApplication } from "./types";
import { Paper, Chip, Button } from "@mui/material";

interface ApplicationItemProps {
  app: JobApplication;
  onDelete: (id: number) => void;
  onCycleStatus: (id: number) => void;
}

const statusColor = {
  sent: "default",
  interview: "info",
  offer: "success",
  rejected: "error",
} as const;

export function ApplicationItem({
  app,
  onDelete,
  onCycleStatus,
}: ApplicationItemProps) {
  return (
    <Paper sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
      <span style={{ marginRight: "auto" }}>
        {app.company} — {app.position}
      </span>
      <Button size="small" color="error" onClick={() => onDelete(app.id)}>
        X
      </Button>
      <Chip
        label={app.status}
        color={statusColor[app.status]}
        onClick={() => onCycleStatus(app.id)}
      />
    </Paper>
  );
}
