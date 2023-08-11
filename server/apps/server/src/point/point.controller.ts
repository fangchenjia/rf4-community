import { ConfigService } from '@nestjs/config';
import { RedisCacheService } from 'libs/cache';
import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PointService } from './point.service';

@Controller('point')
@ApiTags('点位模块')
export class PointController {
  constructor(private pointService: PointService) {}

  @Get('wechatArticleList')
  @ApiOperation({ summary: '获取微信公众号最新文章' })
  async register() {
    return await this.pointService.getWechatArticleList();
  }
}
