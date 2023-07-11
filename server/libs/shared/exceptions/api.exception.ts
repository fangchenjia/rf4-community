import { HttpException } from '@nestjs/common';
import { ErrorEnumType } from 'shared/contants/error-code.contants';

/**
 * Api业务异常均抛出该异常
 */
export class ApiException extends HttpException {
  /**
   * 业务类型错误代码，非Http code
   */
  private errorType: ErrorEnumType;

  constructor(errorType: ErrorEnumType) {
    super(errorType.message, 200);
    this.errorType = errorType;
  }

  getErrorCode(): number {
    return this.errorType.code;
  }
}
