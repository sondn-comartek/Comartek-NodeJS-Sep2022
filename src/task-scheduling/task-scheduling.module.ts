import { Module } from '@nestjs/common';
import { TaskSchedulingService } from './task-scheduling.service';

@Module({
  providers: [TaskSchedulingService],
})
export class TaskSchedulingModule {}
