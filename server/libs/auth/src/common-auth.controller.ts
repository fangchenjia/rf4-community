import { CommonService } from './../../common/src/common.service';
import {
  Controller,
  Get,
  UseGuards,
  Req,
  Body,
  Inject,
  Session,
  Res,
  Post,
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
import { getSmsDto } from './auth.dto';
import { CaptchaGuard } from 'common/common';

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

  @Post('sms')
  @ApiOperation({ summary: '获取短信验证码' })
  @UseGuards(CaptchaGuard)
  async sms(@Body() body: getSmsDto, @Req() req, @Session() session) {
    const { mobile } = body;
    // 检查1分钟内是否发送过验证码
    const lastTime = await this.cacheManager.get(`sms:${mobile}:lastTime`);
    if (lastTime) {
      if (Date.now() - +lastTime < 60 * 1000) {
        // 清空图形验证码
        session.captcha = null;
        return {
          code: 1,
          message: '1分钟内只能发送一次验证码',
        };
      }
    }
    // 生成6位数验证码
    const code = Math.floor(Math.random() * 1000000);
    session.smsCode = code;
    // 记录验证码发送时间
    await this.cacheManager.set(`sms:${mobile}:lastTime`, Date.now());
    return await this.commonService.sms(mobile, code + '');
  }
}
