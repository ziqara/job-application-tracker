import express from "express";

const app = express();

const PORT = 3000;

const applications = [
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
];

app.get("/applications", (req, res) => {
  res.json(applications);
});

app.listen(PORT, () => {
  console.log(`Сервер на http://localhost:${PORT}`);
});
