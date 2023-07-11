import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseDto } from '../class/response.class';
import { ApiException } from 'shared/exceptions/api.exception';
import { Logger } from 'winston';

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  constructor(private logger: Logger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // 如果不是HttpException，则为500错误
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    // set json response
    response.header('Content-Type', 'application/json; charset=utf-8');
    // 如果是ApiException，则返回业务错误码，否则返回Http错误码
    const code =
      exception instanceof ApiException
        ? (exception as ApiException).getErrorCode()
        : status;
    let message = '服务器异常，请稍后再试';
    message =
      exception instanceof HttpException ? exception.message : `${exception}`;
    // 记录 500 日志
    if (status >= 500) {
      this.logger.error(exception as string, ApiExceptionFilter.name);
    }
    const result = new ResponseDto(code, null, message);
    response.status(status).send(result);
  }
}
