export type Status = "sent" | "interview" | "offer" | "rejected" | "all";

export interface JobApplication {
  id: number;
  company: string;
  position: string;
  status: Status;
  date: string;
  notes?: string;
}
