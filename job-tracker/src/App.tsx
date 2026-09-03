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

  useEffect(() => {
    fetch("/applications.json")
      .then((response) => response.json())
      .then((data) => setJobForMe(data));
  }, []);
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
      <ApplicationForm onAdd={(newApp) => setJobForMe([...jobForMe, newApp])} />
      <ApplicationList
        applications={visible}
        onDelete={(id) => setJobForMe(jobForMe.filter((a) => a.id !== id))}
        onCycleStatus={(id) =>
          setJobForMe(
            jobForMe.map((a) =>
              a.id === id ? { ...a, status: nextStatus(a.status) } : a,
            ),
          )
        }
      />
    </>
  );
}

export default App;
