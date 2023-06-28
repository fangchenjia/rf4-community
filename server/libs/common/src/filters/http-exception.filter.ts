import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseDto } from '../class/response.class';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // 判断是否是HttpException，如果是则返回状态码，如果不是则返回500
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    // set json response
    response.header('Content-Type', 'application/json; charset=utf-8');
    let message = '服务器异常，请稍后再试';
    message =
      exception instanceof HttpException ? exception.message : `${exception}`;
    const result = new ResponseDto(status, null, message);
    response.status(status).send(result);
  }
}
