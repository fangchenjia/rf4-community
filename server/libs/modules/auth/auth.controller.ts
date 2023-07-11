import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDocument } from 'libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { registerDto, loginDto } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ReqUser } from 'shared/decorators/req-user.decorator';
import { SmsCaptchaGuard } from 'shared/guards/sms-captcha.guard';

@Controller('user')
@ApiTags('用户模块')
export class AuthController {
  constructor(
    private authService: AuthService, // jwt
  ) {}

  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  @UseGuards(SmsCaptchaGuard)
  async register(@Body() registerDto: registerDto) {
    return await this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  @UseGuards(AuthGuard('USER_LOGIN'))
  async login(@Body() loginDto: loginDto, @Req() req) {
    const accessToken = await this.authService.generateAccessToken({
      id: String(req.user._id),
    });
    const refreshToken = await this.authService.generateRefreshToken({
      id: String(req.user._id),
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  // 获取用户信息
  @Get('info')
  @ApiOperation({ summary: '获取用户信息' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('USER_JWT'))
  async userInfo(@ReqUser() user: UserDocument) {
    return user;
  }
}
