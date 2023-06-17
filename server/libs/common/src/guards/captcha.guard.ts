import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

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
      throw new BadRequestException('验证码不能为空');
    }
    // 全部转为小写
    if (captcha.toLowerCase() !== sessionCaptch?.toLowerCase()) {
      // 清除session中的验证码
      request.session.captcha = null;
      throw new BadRequestException('验证码错误');
    }
    return true;
  }
}