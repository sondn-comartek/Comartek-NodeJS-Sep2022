import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "../constant";
import { ROLES_KEY } from "../decorator";

@Injectable()
export class RoleStrategy implements CanActivate {
    constructor(private reflector : Reflector){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY , [
            context.getHandler() ,
            context.getClass()
        ])
        if(!requiredRoles) return true ;
       const { user } = context.switchToHttp().getRequest()
       return requiredRoles.some( role => role === user?.role );
    }
}