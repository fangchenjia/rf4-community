import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ErrorEnum } from 'shared/contants/error-code.contants';
import { ApiException } from 'shared/exceptions/api.exception';
@Injectable()
export class CaptchaGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const captcha = request.body.captcha;
    const sessionCaptch = request.session.captcha;
    // 验证码校验
    if (!captcha) {
      // 清除session中的验证码
      request.session.captcha = null;
      throw new ApiException(ErrorEnum.INVALID_INPUT); // 验证码不能为空
    }
    // 全部转为小写
    if (captcha.toLowerCase() !== sessionCaptch?.toLowerCase()) {
      const err = sessionCaptch
        ? new ApiException(ErrorEnum.INVALID_CAPTCHA) // 验证码错误
        : new ApiException(ErrorEnum.CAPTCHA_EXPIRED); // 验证码已过期
      // 清除session中的验证码
      request.session.captcha = null;
      throw err;
    }
    // 清除session中的验证码
    request.session.captcha = null;
    return true;
  }
}
