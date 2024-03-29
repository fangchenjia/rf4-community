import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PointService } from './point.service';
import { AuthGuard } from '@nestjs/passport';
import { ReqUser } from 'shared/decorators/req-user.decorator';
import { UserDocument } from 'libs/db/models/user.model';
import {
  PointDetailDto,
  QueryPointsDto,
  QueryUserDto,
  QueryUserRankDto,
  SubmitPointDto,
} from './point.dto';

@Controller('point')
@ApiTags('点位模块')
export class PointController {
  constructor(private pointService: PointService) {}

  @Get('wechatArticleList')
  @ApiOperation({ summary: '获取微信公众号最新文章' })
  async register() {
    return await this.pointService.getWechatArticleList();
  }

  @Get('latestPoints')
  @ApiOperation({ summary: '获取最新点位' })
  async latestPoints() {
    return await this.pointService.getLatestPoints();
  }

  @Get('points')
  @ApiOperation({ summary: '获取点位数据' })
  async getPoints(@Query() query: QueryPointsDto) {
    return await this.pointService.getPoints(query);
  }

  @Post('pointDetail')
  @ApiOperation({ summary: '获取点位详情' })
  async pointDetail(@Body() param: PointDetailDto) {
    return await this.pointService.getPointDetail(param._id);
  }

  @Post('likePoint')
  @ApiOperation({ summary: '点赞' })
  @UseGuards(AuthGuard('USER_JWT'))
  async likePoine(@ReqUser() user, @Body() body: PointDetailDto) {
    return await this.pointService.likePoint(user.id, body._id);
  }

  @Post('submitPoint')
  @ApiOperation({ summary: '投稿' })
  @UseGuards(AuthGuard('USER_JWT'))
  async submitPoint(
    @ReqUser() user: UserDocument,
    @Body() body: SubmitPointDto,
  ) {
    return await this.pointService.submitPoint(user, body);
  }

  @Get('userPoints')
  @ApiOperation({ summary: '获取用户点位' })
  async userPoints(@Query() query: QueryUserDto) {
    return await this.pointService.userPoints(query._id);
  }

  @ApiOperation({ summary: '获取投稿次数排行榜' })
  @Get('userRank')
  async userRank(@Query() query: QueryUserRankDto) {
    return await this.pointService.userRank(query);
  }
}
