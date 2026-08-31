import "./App.css";
import { useState } from "react";

type Status = "sent" | "interview" | "offer" | "rejected";

interface JobApplication {
  id: number;
  company: string;
  position: string;
  status: Status;
  date: string;
  notes?: string;
}

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

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState<Status>("sent");

  return (
    <>
      <h1>Трекер откликов</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newApp: JobApplication = {
            id: Date.now(),
            company: company,
            position: position,
            status: status,
            date: new Date().toISOString().slice(0, 10),
          };
          setJobForMe([...jobForMe, newApp]);
          setCompany("");
          setPosition("");
          setStatus("sent");
        }}
      >
        <input
          placeholder="Компания"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          placeholder="Позиция"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Status)}
        >
          <option value="sent">Отправлено</option>
          <option value="interview">Собеседование</option>
          <option value="offer">Оффер</option>
          <option value="rejected">Отказ</option>
        </select>

        <button type="submit">Добавить</button>
      </form>
      <ul>
        {jobForMe.map((item) => (
          <li key={item.id}>
            {item.company} - {item.position} - /{item.status}/
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
