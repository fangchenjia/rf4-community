import { Inject, UnauthorizedException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { User } from 'libs/db/models/user.model';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-login') {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    @InjectModel(User) private readonly userModel,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true, // 传递 req 给回调函数 用于获取token
    } as StrategyOptions);
  }
  /**
   * @param req  请求对象
   * @param payload  从 token 中解析出来的用户信息
   * @returns  返回用户信息
   */
  async validate(req, payload) {
    // 获取token
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    // 从redis中获取token
    const redisToken = await this.cacheManager.get(`accessToken:${payload.id}`);
    // 判断与redis token是否相等 如果不相等则说明 token 已经过期（如非唯一登录）
    if (!redisToken || redisToken !== token) {
      throw new UnauthorizedException('登录已过期');
    }
    // 返回用户信息
    return await this.userModel.findById(payload.id);
  }
}
