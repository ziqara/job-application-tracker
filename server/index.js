import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

app.get("/applications", async (req, res) => {
  const result = await pool.query("SELECT * FROM applications ORDER BY id");
  res.json(result.rows);
});
app.post("/applications", async (req, res) => {
  const { company, position, status, date, notes } = req.body;
  if (
    !company ||
    company.trim() === "" ||
    !position ||
    position.trim() === ""
  ) {
    return res.status(400).json({ error: "Клиент прислал плохие данные" });
  }
  const result = await pool.query(
    `INSERT INTO applications (company, position, status, date, notes)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [company, position, status, date, notes ?? null],
  );
  res.status(201).json(result.rows[0]);
});
app.delete("/applications/:id", async (req, res) => {
  const id = Number(req.params.id);
  const result = await pool.query("DELETE FROM applications WHERE id = $1", [
    id,
  ]);
  if (result.rowCount === 0) {
    return res.status(404).json({ error: "Не удалось" });
  }
  res.status(204).end();
});
app.patch("/applications/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;
  const result = await pool.query(
    "UPDATE applications SET status = $1 WHERE id = $2 RETURNING *",
    [status, id],
  );
  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Не найдено" });
  }
  res.json(result.rows[0]);
});
app.listen(PORT, () => {
  console.log(`Сервер на http://localhost:${PORT}`);
});
