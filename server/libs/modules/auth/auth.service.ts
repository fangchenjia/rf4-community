import { Injectable } from '@nestjs/common';
import { User, UserDocument } from 'libs/db/models/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { ApiException } from 'shared/exceptions/api.exception';
import { ErrorEnum } from 'shared/contants/error-code.contants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import {
  RedisCacheService,
  generateAccessTokenKey,
  generateRefreshTokenKey,
} from 'libs/cache';

type jwtPayload = {
  id: string;
} & Record<string, any>;

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel,
    private redisCacheService: RedisCacheService, // 缓存
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  // 校验用户
  async validateUser(mobile: string, password: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ mobile }).select('+password');
    if (!user) {
      throw new ApiException(ErrorEnum.USER_NOT_EXIST); // 用户不存在
    }
    if (!compareSync(password, user.password)) {
      throw new ApiException(ErrorEnum.INVALID_USER); // 密码错误
    }
    return user;
  }
  // 生成token
  generateToken(payload: object, expiresIn = 7200) {
    return this.jwtService.sign(
      { ...payload },
      {
        expiresIn: Number(expiresIn),
        secret: this.configService.get('JWT_SECRET'),
      },
    );
  }
  // 生成accessToken
  async generateAccessToken(payload: jwtPayload) {
    const validitySec = this.configService.get('ACCESS_TOKEN_VALIDITY_SEC');
    const accessToken = this.generateToken(payload, validitySec);
    const accessTokenRedisKey = generateAccessTokenKey(payload.id);
    this.redisCacheService.cacheSet(
      accessTokenRedisKey,
      accessToken,
      validitySec,
    );
    return accessToken;
  }
  // 生成refreshToken
  async generateRefreshToken(payload: jwtPayload) {
    const validitySec = this.configService.get('REFRESH_TOKEN_VALIDITY_SEC');
    const refreshToken = this.generateToken(payload, validitySec);
    const refreshTokenRedisKey = generateRefreshTokenKey(payload.id);
    this.redisCacheService.cacheSet(
      refreshTokenRedisKey,
      refreshToken,
      validitySec,
    );
    return refreshToken;
  }
  // 校验token
  async validateToken(token: string) {
    // 从token中解析出用户信息
    const payload = this.jwtService.decode(token) as jwtPayload;
    // 从redis中获取token
    const redisToken = await this.redisCacheService.cacheGet(
      generateAccessTokenKey(payload.id),
    );
    // 判断与redis token是否相等 如果不相等则说明 token 已经过期（如非唯一登录）
    if (!redisToken) {
      throw new ApiException(ErrorEnum.TOKEN_EXPIRED); // token已过期
    } else if (redisToken !== token) {
      throw new ApiException(ErrorEnum.INVALID_TOKEN); // token无效 其他设备登录
    }
    // 返回用户信息
    return await this.userModel.findById(payload.id);
  }
  // 生成随机昵称 用户+随机字符串
  getRandomNickname() {
    const randomString = Math.random().toString(36).substr(2);
    return `用户${randomString}`;
  }
  // 注册
  async register(registerDto) {
    const { mobile } = registerDto;
    // 判断用户名是否已经存在
    if (await this.userModel.findOne({ mobile })) {
      throw new ApiException(ErrorEnum.USER_EXIST); // 用户已存在
    } else {
      // 创建用户 并生成随机昵称 不返回密码
      const user = await this.userModel.create({
        ...registerDto,
        nickname: this.getRandomNickname(),
      });
      return {
        id: user._id,
        mobile: user.mobile,
        nickname: user.nickname,
      };
    }
  }
}