import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from './user.schema';

export const GetUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
