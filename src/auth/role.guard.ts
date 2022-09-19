import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { JwtService } from '@nestjs/jwt';
export const ROLES_KEY = 'roles';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const jwt = context.switchToHttp().getRequest().body.jwt;
    let user;
    try {
    user = this.jwtService.verify(jwt)
    } catch(err) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'jwt error',
      }, HttpStatus.BAD_REQUEST);
    }

    return requiredRoles.some((role) => user?.role === role);
  }
}