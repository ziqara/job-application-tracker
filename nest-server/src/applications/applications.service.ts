import { Injectable } from '@nestjs/common';

export interface Application {
  id: number;
  company: string;
  position: string;
  status: string;
  date: string;
  notes?: string;
}

@Injectable()
export class ApplicationsService {
  private applications: Application[] = [
    {
      id: 1,
      company: 'Google',
      position: 'Frontend Developer',
      status: 'Applied',
      date: '2026-09-01',
      notes: 'Отклик через LinkedIn',
    },

    {
      id: 2,
      company: 'Yandex',
      position: 'Fullstack Engineer',
      status: 'Interview',
      date: '2026-09-03',
    },
  ];

  findAll(): Application[] {
    return this.applications;
  }
}
