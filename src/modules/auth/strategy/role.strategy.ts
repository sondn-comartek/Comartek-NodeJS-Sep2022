import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import { UserRole } from "src/modules/user/types";

@Injectable()
export class RoleStrategy implements CanActivate {
    constructor(private  reflector: Reflector){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const ctx = GqlExecutionContext.create(context)
        const requiredRole = this.reflector.getAllAndMerge<UserRole[]>('roles' , [
            ctx.getHandler() ,
            ctx.getClass() ,
        ])
        if(requiredRole.length === 0) return true ;
        const { user } = ctx.getContext().req
        return requiredRole.some( role => role === user.role)
    }
}