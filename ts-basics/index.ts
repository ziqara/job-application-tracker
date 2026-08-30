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
        date: "2023-01-01"
    },

    {
        id: 2,
        company: "InnovateX",
        position: "Backend Developer",  
        status: "interview",
        date: "2023-02-15",
        notes: "Interview scheduled for next week."
    },

    {
        id: 3,
        company: "DataSystems",
        position: "Data Analyst",
        status: "offer",
        date: "2023-03-20"
    }
];

function filterByStatus(applications: Array<JobApplication>, status: Status): Array<JobApplication> {
    return applications.filter(x => x.status === status);
}

console.log(filterByStatus(jobForMe, "interview"));
console.log(filterByStatus(jobForMe, "offer"));
