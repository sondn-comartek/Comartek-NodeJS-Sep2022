import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserRole } from '../../shared/enums/user-role.enum';

export const Admin = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const user = GqlExecutionContext.create(ctx).getContext().req.user;
    if (user?.role !== UserRole.Admin) {
      throw new ForbiddenException('Only ADMIN can do this action');
    }

    return user;
  },
);
