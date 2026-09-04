import type { Status, JobApplication } from "./types";
import { useState } from "react";
import { TextField, MenuItem, Button, Stack } from "@mui/material";

interface ApplicationFormProps {
  onAdd: (app: JobApplication) => void;
}

export function ApplicationForm({ onAdd }: ApplicationFormProps) {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState<Status>("sent");

  return (
    <Stack
      component="form"
      direction="row"
      spacing={1}
      useFlexGap
      sx={{ mb: 3, alignItems: "center" }}
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
      <TextField
        label="Компания"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        size="small"
        sx={{ flex: 1 }}
      />
      <TextField
        label="Позиция"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        size="small"
        sx={{ flex: 1 }}
      />
      <TextField
        select
        value={status}
        onChange={(e) => setStatus(e.target.value as Status)}
        size="small"
      >
        <MenuItem value="sent">Отправлено</MenuItem>
        <MenuItem value="interview">Собеседование</MenuItem>
        <MenuItem value="offer">Оффер</MenuItem>
        <MenuItem value="rejected">Отказ</MenuItem>
      </TextField>

      <Button type="submit" variant="contained" sx={{ height: 40 }}>
        Добавить
      </Button>
    </Stack>
  );
}
