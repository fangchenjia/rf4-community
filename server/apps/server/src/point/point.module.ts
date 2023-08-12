import { Module } from '@nestjs/common';
import { PointController } from './point.controller';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RedisCacheService } from 'libs/cache';
import { PointService } from './point.service';
import { TasksService } from '../schedule/task.service';

@Module({
  imports: [],
  controllers: [PointController],
  providers: [
    JwtService,
    ConfigService,
    RedisCacheService,
    PointService,
    TasksService,
  ],
})
export class PointModule {}
