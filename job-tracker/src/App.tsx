import "./App.css";
import { useState } from "react";
import type { JobApplication, Status } from "./types";
import { ApplicationList } from "./ApplicationList";
import { ApplicationForm } from "./ApplicationForm";

function App() {
  const [jobForMe, setJobForMe] = useState<JobApplication[]>([
    {
      id: 1,
      company: "TechCorp",
      position: "Frontend Developer",
      status: "sent",
      date: "2023-01-01",
    },

    {
      id: 2,
      company: "InnovateX",
      position: "Backend Developer",
      status: "interview",
      date: "2023-02-15",
      notes: "Interview scheduled for next week.",
    },

    {
      id: 3,
      company: "DataSystems",
      position: "Data Analyst",
      status: "offer",
      date: "2023-03-20",
    },
  ]);
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const visible =
    statusFilter === "all"
      ? jobForMe
      : jobForMe.filter((a) => a.status === statusFilter);

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
      />
    </>
  );
}

export default App;
