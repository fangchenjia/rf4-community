import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Inject } from '@nestjs/common';

export class LocalStrategy extends PassportStrategy(Strategy, 'USER_LOGIN') {
  constructor(@Inject(AuthService) private authService: AuthService) {
    super({
      usernameField: 'mobile',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(mobile: string, password: string) {
    const user = await this.authService.validateUser(mobile, password);
    return user;
  }
}
