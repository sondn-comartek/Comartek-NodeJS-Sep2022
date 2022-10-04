import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'
import { Reflector } from "@nestjs/core";

export class JwtGuard extends AuthGuard('jwt') {
   constructor() {
      super()
   }
   getRequest(context: ExecutionContext) {
      const ctx = GqlExecutionContext.create(context)
      return ctx.getContext().req
   }
}
