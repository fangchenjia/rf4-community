import { AuthService } from './auth.service';
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
  BadRequestException,
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
import { Keep } from 'common/common/decorators/keep.decorator';
import { es } from 'tencentcloud-sdk-nodejs';

@Controller('auth')
@ApiTags('用户授权')
export class CommonAuthController {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache, // 缓存
    private jwtServer: JwtService, // jwt
    @InjectModel(User) private userModel: ReturnModelType<typeof User>, // 用户模型
    private authService: AuthService, // 公共服务
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
  @Keep()
  async captcha(@Session() session, @Res() res) {
    const svgCaptcha = await this.authService.captche(); //创建验证码
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
    // 清空图形验证码
    session.captcha = null;
    // 检查1分钟内是否发送过验证码
    const lastTime = await this.cacheManager.get(`sms:${mobile}:lastTime`);
    if (lastTime) {
      if (Date.now() - +lastTime < 60 * 1000) {
        throw new BadRequestException('1分钟内只能发送一次验证码');
      }
    }
    // 生成6位数验证码
    const code = Math.floor(100000 + Math.random() * 900000);
    session.smsCode = String(code);
    // 记录验证码发送时间
    await this.cacheManager.set(`sms:${mobile}:lastTime`, Date.now());
    const smsStatus = await this.authService.sms(mobile, code + '');
    const smsErrEnum = {
      Ok: '发送成功',
      'LimitExceeded.PhoneNumberDailyLimit': '手机号码日发送次数超限',
      'LimitExceeded.PhoneNumberOneHourLimit': '手机号码1小时内发送次数超限',
      'LimitExceeded.PhoneNumberSameContentDailyLimit':
        '手机号码日相同内容发送次数超限',
      'LimitExceeded.PhoneNumberTwentyHourLimit':
        '手机号码20小时内发送次数超限',
      'LimitExceeded.PhoneNumberTwentyFourHourLimit':
        '手机号码24小时内发送次数超限',
      'LimitExceeded.PhoneNumberFiveMinuteLimit': '手机号码5分钟内发送次数超限',
    };
    if (smsStatus.SendStatusSet[0].Code === 'Ok') {
      return '发送成功';
    } else {
      throw new BadRequestException(
        smsErrEnum[smsStatus.SendStatusSet[0].Code] ||
          smsStatus.SendStatusSet[0].Message,
      );
    }
  }
}
