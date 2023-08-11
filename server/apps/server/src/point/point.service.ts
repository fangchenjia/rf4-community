import { Injectable } from '@nestjs/common';
import { ApiException } from 'shared/exceptions/api.exception';
import { ErrorEnum } from 'shared/contants/error-code.contants';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { RedisCacheService } from 'libs/cache';

@Injectable()
export class PointService {
  constructor(
    private redisCacheService: RedisCacheService, // 缓存
  ) {}
  // 获取微信公众号最新文章
  async getWechatArticleList() {
    return (await this.redisCacheService.cacheGet('wechatArticleList')) || [];
  }
}
