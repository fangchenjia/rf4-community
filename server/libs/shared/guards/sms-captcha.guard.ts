import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { RedisCacheService, generateSmsCodeKey } from 'libs/cache';
import { ErrorEnum } from 'shared/contants/error-code.contants';
import { ApiException } from 'shared/exceptions/api.exception';

@Injectable()
export class SmsCaptchaGuard implements CanActivate {
  constructor(private redisCacheService: RedisCacheService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const smsCode = request.body.smsCode;
    const mobile = request.body.mobile;
    const smsCodeCacheKey = generateSmsCodeKey(mobile);
    const smsCache = await this.redisCacheService.cacheGet(smsCodeCacheKey);
    // 测试环境代码
    if (process.env.NODE_ENV === 'dev') {
      if (smsCode === '123456') {
        return true;
      }
    }
    if (!smsCode || !mobile) {
      throw new ApiException(ErrorEnum.INVALID_INPUT); // 手机号或验证码不能为空
    }
    // 验证码校验
    if (!smsCache) {
      throw new ApiException(ErrorEnum.SMS_CODE_EXPIRED); // 验证码已过期
    }
    console.log(smsCache.code, smsCode);
    if (smsCode !== smsCache.code) {
      // 错误次数校验
      const validateCount = smsCache.validateCount + 1;
      this.redisCacheService.cacheSet(smsCodeCacheKey, {
        code: smsCache.code,
        validateCount,
        lastTime: smsCache.lastTime,
      });
      if (validateCount >= 3) {
        this.redisCacheService.cacheDel(smsCodeCacheKey);
      }
      throw new ApiException(ErrorEnum.INVALID_SMS_CODE); // 验证码错误
    }
    this.redisCacheService.cacheDel(smsCodeCacheKey);
    return true;
  }
}
