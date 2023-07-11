import { RedisCacheService } from 'libs/cache';
import {
  Controller,
  Get,
  UseGuards,
  Req,
  Body,
  Session,
  Res,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CommonService } from './common.service';
import { Keep } from 'shared/decorators/keep.decorator';
import { CaptchaGuard } from 'shared/guards/captcha.guard';
import { getSmsDto } from './common.dto';
import { generateSmsCodeKey } from 'libs/cache';
import { ErrorEnum } from 'shared/contants/error-code.contants';
import { ApiException } from 'shared/exceptions/api.exception';

@Controller('common')
@ApiTags('公共服务')
export class CommonController {
  constructor(private commonService: CommonService) {}

  @Get('captcha')
  @ApiOperation({ summary: '获取图形验证码' })
  @Keep()
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
  async sms(@Body() body: getSmsDto) {
    const { mobile } = body;
    return this.commonService.getSmsCaptcha(mobile);
  }
}
