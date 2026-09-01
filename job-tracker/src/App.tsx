import "./App.css";
import { useState } from "react";
import type { JobApplication } from "./types";
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

  return (
    <>
      <h1>Трекер откликов</h1>
      <ApplicationForm onAdd={(newApp) => setJobForMe([...jobForMe, newApp])} />
      <ApplicationList
        applications={jobForMe}
        onDelete={(id) => setJobForMe(jobForMe.filter((a) => a.id !== id))}
      />
    </>
  );
}

export default App;
