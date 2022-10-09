import { ExecutionContext, UseGuards } from '@nestjs/common'
import {
   Resolver,
   Query,
   Mutation,
   Subscription,
   Context,
   Args,
   ID,
} from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { JwtGuard } from '../auth/guards'
import { Mine } from '../user/decorators'
import { ExcelService } from './excel.service'
import { Excel } from './models'
import { Entity } from './types'

@Resolver()
export class ExcelResolver {
   constructor(
      private readonly excelService: ExcelService,
      private readonly pubSub: PubSub,
   ) {}

   @Query(() => Excel)
   @UseGuards(JwtGuard)
   exportExcel(@Args('entity', { type: () => Entity }) entity: Entity) {
      return this.excelService.export(entity)
   }

   @Subscription(() => Boolean, {
      filter: (payload, variables) => {
         return payload.excelId === variables.excelId
      },
      resolve: ({ success }) => {
         return success
      },
   })
   @UseGuards(JwtGuard)
   excelExported(@Args('excelId', { type: () => ID }) excelId: string) {
      return this.pubSub.asyncIterator('excelExported')
   }
}
