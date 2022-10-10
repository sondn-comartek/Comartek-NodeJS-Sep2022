import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role } from '../role/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const ctx = GqlExecutionContext.create(context);

        const user = ctx.getContext()?.user
        const User = ctx.getContext()?.req?.user
        if (user) {
            return requiredRoles.some((role) => user.role?.includes(role));
        }
        if (User) {

            return requiredRoles.some((role) => User.role?.includes(role));
        }


    }
}