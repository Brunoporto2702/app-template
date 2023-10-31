import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const WithUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
