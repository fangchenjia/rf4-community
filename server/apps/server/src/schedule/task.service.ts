import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PointService } from '../point/point.service';

@Injectable()
export class TasksService {
  constructor(private pointService: PointService) {}

  // 每天八点到九点每二十分钟执行一次
  @Cron('0 */20 8-9 * * *')
  async handleCron() {
    await this.pointService.captureWechatArticleList();
  }
}
