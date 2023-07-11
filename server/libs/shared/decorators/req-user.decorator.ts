import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const ReqUser = createParamDecorator((data, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest().user;
});
