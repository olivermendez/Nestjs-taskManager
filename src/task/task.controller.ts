import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { TaskService } from './task.service';

import { Task } from '@prisma/client';

@Controller('task')
export class TaskController {
  constructor(private readonly taskServices: TaskService) {}

  @Get()
  async getAllTask(@Req() request: Request) {
    // Acceder a la URL de la solicitud
    console.log(request.url);

    // Acceder al método HTTP de la solicitud (GET, POST, etc.)
    console.log(request.method);

    // Acceder a los encabezados de la solicitud
    console.log(request.headers);

    // Acceder al cuerpo de la solicitud (útil en métodos POST o PUT)
    // Asegúrate de que tu aplicación use middleware para analizar el cuerpo de la solicitud, como bodyParser
    console.log(request.body);

    return this.taskServices.getAllTasks();
  }

  @Post()
  async createTask(@Body() data: Task) {
    return this.taskServices.createTask(data);
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    const task = await this.taskServices.getTaskById(Number(id));

    if (!task) {
      throw new NotFoundException('Task does not exit');
    }

    return {
      success: 200,
      task: task,
    };
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    //const task = this.taskServices.deleteTask(Number(id));

    try {
      const task = await this.taskServices.deleteTask(Number(id));

      if (!task) {
        throw new NotFoundException('Task does not exit!!');
      }

      return {
        info: 'task deleted!',
        success: true,
        task: task,
      };
    } catch (error) {
      throw new NotFoundException('Task does not exit');
    }
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() data: Task) {
    try {
      const task = await this.taskServices.updateTasks(Number(id), data);

      if (!task) {
        throw new NotFoundException('Task does not exit!!');
      }

      return {
        info: 'task updated!',
        success: true,
        task: task,
      };
    } catch (error) {
      throw new NotFoundException('Task does not exit');
    }
  }
}
