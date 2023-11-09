import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RequirePermission } from 'shared/decorators/require-permission.decorator';
import { PermissionAuthGuard } from 'shared/guards/permission-auth.guard';

@Controller('crawler')
@ApiTags('爬虫模块')
// @UseGuards(AuthGuard('USER_JWT'), PermissionAuthGuard)
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Get('updateMapsAndFish')
  @ApiOperation({ summary: '更新地图以及鱼种' })
  async updateMapsAndFish() {
    return await this.crawlerService.updateMapsAndFish();
  }
}
