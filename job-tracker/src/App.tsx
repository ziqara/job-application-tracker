import "./App.css";
import { useState, useEffect } from "react";
import type { JobApplication, Status } from "./types";
import { ApplicationList } from "./ApplicationList";
import { ApplicationForm } from "./ApplicationForm";

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

  const handleAdd = (newApp: JobApplication) => {
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
    <>
      <h1>Трекер откликов</h1>
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value as Status | "all")}
      >
        <option value="all">Все</option>
        <option value="sent">Отправлено</option>
        <option value="interview">Собеседование</option>
        <option value="offer">Оффер</option>
        <option value="rejected">Отказ</option>
      </select>
      <ApplicationForm onAdd={handleAdd} />
      {loading && <p>Загрузка...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && jobForMe.length === 0 && <p>Пока пусто</p>}
      {!loading && !error && (
        <ApplicationList
          applications={visible}
          onDelete={handleDelete}
          onCycleStatus={handleCycleStatus}
        />
      )}
    </>
  );
}

export default App;
