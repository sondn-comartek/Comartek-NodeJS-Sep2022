import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql/dist/services';
import { UsersService } from 'src/module/users/users.service';
import { AuthService } from '../auth.service';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }

        const request = GqlExecutionContext.create(context).getContext().req;
        const user = await this.authService.validateRequest(request);
        
        if(requiredRoles.some((role) => user.userRole?.includes(role))) return true;
        throw new UnauthorizedException();
    }
}