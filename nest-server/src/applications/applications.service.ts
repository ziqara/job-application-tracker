import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.application.findMany();
  }

  async findOne(id: number) {
    const application = await this.prisma.application.findUnique({
      where: { id },
    });
    if (!application) {
      throw new NotFoundException('Заявка с таким Id не найдена');
    }
    return application;
  }

  create(dto: CreateApplicationDto) {
    return this.prisma.application.create({
      data: {
        ...dto,
        date: new Date().toISOString().slice(0, 10),
      },
    });
  }

  async update(id: number, dto: UpdateApplicationDto) {
    await this.findOne(id);
    return this.prisma.application.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.prisma.application.delete({
      where: { id },
    });
  }
}
