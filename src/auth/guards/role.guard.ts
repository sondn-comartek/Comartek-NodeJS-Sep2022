import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Body,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/common/enums';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const authorizationHeader = context.switchToHttp().getRequest()
      .headers.authorization;
    const token = authorizationHeader.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(token, {
        secret: 'jwt_secret_string',
      });

      if (decoded?.error) {
        return false;
      }

      if (requiredRoles.includes(decoded?.role)) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}
