import { useState, useEffect } from "react";
import type { JobApplication, Status } from "./types";
import { ApplicationList } from "./ApplicationList";
import { ApplicationForm } from "./ApplicationForm";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";

function nextStatus(current: Status): Status {
  switch (current) {
    case "sent":
      return "interview";
    case "interview":
      return "offer";
    case "offer":
      return "rejected";
    case "rejected":
      return "sent";

    default:
      return "sent";
  }
}

function App() {
  const [jobForMe, setJobForMe] = useState<JobApplication[]>([]);
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const visible =
    statusFilter === "all"
      ? jobForMe
      : jobForMe.filter((a) => a.status === statusFilter);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/applications")
      .then((response) => response.json())
      .then((data) => setJobForMe(data))
      .catch((err) => {
        console.error(err);
        setError("Не удалось загрузить");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = (newApp: Omit<JobApplication, "id">) => {
    fetch("http://localhost:3000/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newApp),
    })
      .then((r) => r.json())
      .then((savedApp) => setJobForMe([...jobForMe, savedApp]));
  };

  const handleDelete = (id: number) => {
    fetch(`http://localhost:3000/applications/${id}`, {
      method: "DELETE",
    }).then(() => {
      setJobForMe(jobForMe.filter((a) => a.id !== id));
    });
  };

  const handleCycleStatus = (id: number) => {
    const current = jobForMe.find((a) => a.id === id);
    if (!current) return;
    const newStatus = nextStatus(current.status);

    fetch(`http://localhost:3000/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((r) => r.json())
      .then((updated) =>
        setJobForMe(jobForMe.map((a) => (a.id === id ? updated : a))),
      );
  };
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Трекер откликов
      </Typography>
      <TextField
        select
        label="Фильтр по статусу"
        size="small"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value as Status | "all")}
        sx={{ mb: 2, minWidth: 200 }}
      >
        <MenuItem value="all">Все</MenuItem>
        <MenuItem value="sent">Отправлено</MenuItem>
        <MenuItem value="interview">Собеседование</MenuItem>
        <MenuItem value="offer">Оффер</MenuItem>
        <MenuItem value="rejected">Отказ</MenuItem>
      </TextField>
      <ApplicationForm onAdd={handleAdd} />
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && jobForMe.length === 0 && (
        <Alert severity="info">Пока пусто</Alert>
      )}
      {!loading && !error && (
        <ApplicationList
          applications={visible}
          onDelete={handleDelete}
          onCycleStatus={handleCycleStatus}
        />
      )}
    </Container>
  );
}

export default App;
