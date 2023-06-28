import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TRANSFORM_KEEP_KEY_METADATA } from '../contants';
import { Reflector } from '@nestjs/core';
import { ResponseDto } from '../class/response.class';

export interface Response<T> {
  code: number | string;
  message: string;
  result: T;
}
/**
 * 统一处理返回接口结果，如果不需要则添加  Keep装饰器
 */
@Injectable()
export class HttpReqTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private readonly reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const keep = this.reflector.get<boolean>(
          TRANSFORM_KEEP_KEY_METADATA,
          context.getHandler(),
        );
        if (keep) {
          return data;
        } else {
          const response = context.switchToHttp().getResponse();
          response.header('Content-Type', 'application/json; charset=utf-8');
          return new ResponseDto(200, data);
        }
      }),
    );
  }
}
