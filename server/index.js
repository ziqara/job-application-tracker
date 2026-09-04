import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

let applications = [
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
app.post("/applications", (req, res) => {
  const newApp = req.body;
  applications.push(newApp);
  res.status(201).json(newApp);
});
app.delete("/applications/:id", (req, res) => {
  const id = Number(req.params.id);
  applications = applications.filter((a) => a.id !== id);
  res.status(204).end();
});
app.patch("/applications/:id", (req, res) => {
  const id = Number(req.params.id);
  const found = applications.find((a) => a.id === id);
  found.status = req.body.status;
  res.json(found);
});
app.listen(PORT, () => {
  console.log(`Сервер на http://localhost:${PORT}`);
});
