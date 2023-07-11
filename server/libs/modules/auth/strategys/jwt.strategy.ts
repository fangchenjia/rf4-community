import { AuthService } from './../auth.service';
import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

import { ConfigService } from '@nestjs/config';
import { Inject } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy, 'USER_JWT') {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
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
    return this.authService.validateToken(token);
  }
}
