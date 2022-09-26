import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/enum/role.enum';
import { ROLES_KEY } from 'src/decorator/role.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService} from '@nestjs/jwt';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,
              private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const jwt = GqlExecutionContext.create(context).getContext().req.header('authorization')?.split(" ")[1];
    const user = await this.jwtService.verifyAsync(jwt, {secret: process.env.JWT_SECRET})
    return requiredRoles.some((role) => user.role === role)
    
  }
}