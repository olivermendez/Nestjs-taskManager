import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.services';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getAllTasks(): Promise<Task[]> {
    return await this.prisma.task.findMany();
  }

  async getTaskById(id: number): Promise<Task> {
    return await this.prisma.task.findUnique({
      where: {
        id,
      },
    });
  }

  async createTask(data: Task): Promise<Task> {
    return await this.prisma.task.create({
      data,
    });
  }

  async updateTasks(id: number, data: Task): Promise<Task> {
    return await this.prisma.task.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteTask(id: number): Promise<Task> {
    return await this.prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
