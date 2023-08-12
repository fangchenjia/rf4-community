import { Module } from '@nestjs/common';
import { PointService } from '../point/point.service';
import { TasksService } from './task.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [PointService, TasksService],
})
export class TaskModule {}
