import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserRoleEnum } from 'src/modules/user/enums/user-role.enum';

export const Admin = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const user = GqlExecutionContext.create(ctx).getContext().req.user;
    if (user?.role !== UserRoleEnum.ADMIN) {
      throw new ForbiddenException('Only admin can do this action');
    }

    return user;
  },
);
