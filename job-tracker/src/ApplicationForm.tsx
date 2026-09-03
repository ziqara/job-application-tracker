import type { Status, JobApplication } from "./types";
import { useState } from "react";

interface ApplicationFormProps {
  onAdd: (app: JobApplication) => void;
}

export function ApplicationForm({ onAdd }: ApplicationFormProps) {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState<Status>("sent");

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        if (company.trim() === "" || position.trim() === "") {
          return;
        }
        const newApp: JobApplication = {
          id: Date.now(),
          company: company,
          position: position,
          status: status,
          date: new Date().toISOString().slice(0, 10),
        };
        onAdd(newApp);
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
  );
}
