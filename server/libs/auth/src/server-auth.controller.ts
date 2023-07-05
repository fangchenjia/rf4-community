import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  Inject,
  Session,
  UsePipes,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { loginDto, registerDto } from './auth.dto';
import { InjectModel } from 'nestjs-typegoose';
import { User, UserDocument } from 'libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ReqUser } from './req-user.decorator';
import { CaptchaGuard } from 'common/common/guards/captcha.guard';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('用户授权')
export class ServerAuthController {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache, // 缓存
    private jwtServer: JwtService, // jwt
    @InjectModel(User) private userModel: ReturnModelType<typeof User>, // 用户模型
    private authService: AuthService, // 公共服务
  ) {}

  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  async register(@Body() registerDto: registerDto, @Session() session) {
    const { mobile, smsCode } = registerDto;
    // 检查短信验证码
    if (smsCode !== session.smsCode) {
      console.log(smsCode, session.smsCode);
      const smsCodeErrMessage = session.smsCode
        ? '短信验证码错误'
        : '短信验证码已过期';
      throw new BadRequestException(smsCodeErrMessage);
    }
    session.smsCode = null;
    // 判断用户名是否已经存在
    if (await this.userModel.findOne({ mobile })) {
      throw new BadRequestException('用户已存在');
    } else {
      // 创建用户 并生成随机昵称 不返回密码
      const user = await this.userModel.create({
        ...registerDto,
        nickname: this.authService.getRandomNickname(),
      });
      return {
        id: user._id,
        mobile: user.mobile,
        nickname: user.nickname,
      };
    }
  }

  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  @UseGuards(AuthGuard('local-login'))
  async login(@Body() loginDto: loginDto, @Req() req, @Session() session) {
    // 生成accessToken设置过期时间为30分钟，并且将 accessToken存入redis 中
    const accessToken = this.jwtServer.sign(
      { id: String(req.user._id) },
      {
        expiresIn: Number(process.env.ACCESS_TOKEN_VALIDITY_SEC),
      },
    );
    const accessTokenRedisKey = `accessToken:${req.user._id}`;
    // as any 为了解决ts语法报错，不知道包有问题还是什么原因，ts提示第三个参数为ttl,number类型，但实际应该传对象，对象里面包裹ttl
    this.cacheManager.set(accessTokenRedisKey, accessToken, {
      ttl: Number(process.env.ACCESS_TOKEN_VALIDITY_SEC),
    } as any);
    // 生成 refreshToken 设置过期时间为 7 天
    // refreshToken 用于刷新 accessToken, 实现无感知刷新
    const refreshToken = this.jwtServer.sign(
      { id: String(req.user._id) },
      {
        expiresIn: Number(process.env.REFRESH_TOKEN_VALIDITY_SEC),
      },
    );
    const refreshTokenRedisKey = `refreshToken:${req.user._id}`;
    this.cacheManager.set(refreshTokenRedisKey, refreshToken, {
      ttl: Number(process.env.REFRESH_TOKEN_VALIDITY_SEC),
    } as any);
    return {
      accessToken,
      refreshToken,
    };
  }
}
