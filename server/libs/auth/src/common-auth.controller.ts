import { CommonService } from './../../common/src/common.service';
import {
  Controller,
  Get,
  UseGuards,
  Req,
  Inject,
  Session,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { InjectModel } from 'nestjs-typegoose';
import { User, UserDocument } from 'libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ReqUser } from './req-user.decorator';

@Controller('auth')
@ApiTags('用户授权')
export class CommonAuthController {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache, // 缓存
    private jwtServer: JwtService, // jwt
    @InjectModel(User) private userModel: ReturnModelType<typeof User>, // 用户模型
    private commonService: CommonService, // 公共服务
  ) {}

  @Get('info')
  @ApiOperation({ summary: '获取用户信息' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt-login'))
  async userInfo(@ReqUser() user: UserDocument) {
    return user;
  }

  @Get('captcha')
  @ApiOperation({ summary: '获取图形验证码' })
  async captcha(@Session() session, @Res() res) {
    const svgCaptcha = await this.commonService.captche(); //创建验证码
    session.captcha = svgCaptcha.text; //使用session保存验证，用于登陆时验证
    console.log(session.captcha);
    res.type('image/svg+xml'); //指定返回的类型
    res.send(svgCaptcha.data); //给页面返回一张图片
  }
}
