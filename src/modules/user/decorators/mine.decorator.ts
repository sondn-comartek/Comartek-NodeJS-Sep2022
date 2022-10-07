import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const Mine = createParamDecorator(
   (data: unknown, contex: ExecutionContext) => {
      const ctx = GqlExecutionContext.create(contex)
      return ctx.getContext().req.user
   },
)
