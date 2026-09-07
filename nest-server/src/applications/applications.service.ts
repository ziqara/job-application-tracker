import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { CreateApplicationDto } from './dto/create-application.dto';

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

  private nextId = 3;

  findAll(): Application[] {
    return this.applications;
  }

  findOne(id: number): Application {
    const result = this.applications.find((a) => a.id === id);
    if (!result) {
      throw new NotFoundException('Заявка с таким Id не найдена');
    }
    return result;
  }

  create(dto: CreateApplicationDto) {
    const application = {
      id: this.nextId++,
      ...dto,
      date: new Date().toISOString().slice(0, 10),
    };
    this.applications.push(application);
    return application;
  }

  update(id: number, dto: UpdateApplicationDto): Application {
    const application = this.findOne(id);
    Object.assign(application, dto);
    return application;
  }

  remove(id: number): void {
    this.findOne(id);
    this.applications = this.applications.filter((a) => a.id !== id);
  }
}
