type Status = "sent" | "interview" | "offer" | "rejected";

interface JobApplication {
  id: number;
  company: string;
  position: string;
  status: Status;
  date: string;
  notes?: string;
}

const jobForMe: Array<JobApplication> = [
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

function filterByStatus(
  applications: Array<JobApplication>,
  status: Status,
): Array<JobApplication> {
  return applications.filter((x) => x.status === status);
}

function getCompanies(applications: Array<JobApplication>): Array<string> {
  return applications.map((x) => x.company);
}

function findById(
  applications: Array<JobApplication>,
  id: number,
): JobApplication | undefined {
  return applications.find((x) => x.id === id);
}

const found = findById(jobForMe, 99);

// if (found !== undefined) {
//     console.log(found.company);
// }
// else {
//     console.log("No job application found with the given ID.");
// }

// console.log(found?.company);

console.log(found?.company ?? "не найдено");

function countWithNotes(applications: Array<JobApplication>): number {
  return applications.reduce((count, app) => {
    return app.notes ? count + 1 : count;
  }, 0);
}
