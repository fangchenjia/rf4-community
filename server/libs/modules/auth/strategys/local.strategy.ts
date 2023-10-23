import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Inject } from '@nestjs/common';
import { ApiException } from 'shared/exceptions/api.exception';
import { ErrorEnum } from 'shared/contants/error-code.contants';

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

  authenticate(req, options) {
    const { mobile, password } = req.body;
    // 覆盖PassportStrategy 默认的 401 错误
    if (!mobile || !password) {
      throw new ApiException(ErrorEnum.INVALID_INPUT);
    }
    return super.authenticate(req, options);
  }
}
