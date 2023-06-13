import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { User } from 'libs/db/models/user.model';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor(@InjectModel(User) private readonly userModel) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    } as StrategyOptions);
  }
  /**
   * @param id  从 token 中解析出来的 id
   * @returns  返回用户信息
   */
  async validate(id) {
    return await this.userModel.findById(id);
  }
}
