import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { PrimsaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [TaskService],
  controllers: [TaskController],
  imports: [PrimsaModule],
})
export class TaskModule {}
