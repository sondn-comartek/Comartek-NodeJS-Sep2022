import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import { UserStatus } from "src/modules/user/types";



@Injectable() 
export class StatusStrategy implements CanActivate{
    constructor(
        private reflector: Reflector 
    ){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const ctx = GqlExecutionContext.create(context)
        const requiredStatus = this.reflector.getAllAndMerge<UserStatus[]>('status' , [
            ctx.getHandler() ,
            ctx.getClass()
        ])
        if(requiredStatus.length === 0) return true ; 
        const { user } = ctx.getContext().req ;
        return  requiredStatus.some( status => status === user?.status);
    }
}