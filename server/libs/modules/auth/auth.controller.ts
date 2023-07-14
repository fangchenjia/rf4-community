import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDocument } from 'libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { registerDto, loginDto, refreshTokenDto } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ReqUser } from 'shared/decorators/req-user.decorator';
import { SmsCaptchaGuard } from 'shared/guards/sms-captcha.guard';

@Controller('auth')
@ApiTags('登录注册模块')
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
  async login(@Body() loginDto: loginDto, @ReqUser() user) {
    const accessToken = await this.authService.generateAccessToken({
      id: String(user._id),
    });
    const refreshToken = await this.authService.generateRefreshToken({
      id: String(user._id),
    });
    return {
      accessToken,
      refreshToken,
      userInfo: {
        mobile: user.mobile,
        nickname: user.nickname,
      },
    };
  }

  @Post('refresh-token')
  @ApiOperation({ summary: '刷新token' })
  async refreshToken(@Body() refreshTokenDto: refreshTokenDto) {
    return await this.authService.refreshToken(refreshTokenDto.refreshToken);
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
