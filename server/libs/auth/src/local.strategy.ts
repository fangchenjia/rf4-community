import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { User } from 'libs/db/models/user.model';
import { BadRequestException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';

export class LocalStrategy extends PassportStrategy(Strategy, 'local-login') {
  constructor(@InjectModel(User) private readonly userModel) {
    super({
      usernameField: 'mobile',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(mobile: string, password: string) {
    console.log(mobile, password);
    // 密码数据库默认不返回，这里需要手动指定
    const user = await this.userModel.findOne({ mobile }).select('+password');
    if (!user) {
      throw new BadRequestException('用户名不存在');
    }
    if (!compareSync(password, user.password)) {
      throw new BadRequestException('密码错误');
    }
    return user;
  }
}
