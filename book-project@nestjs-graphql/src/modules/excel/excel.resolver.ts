import { ExecutionContext } from '@nestjs/common'
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
import { ExcelService } from './excel.service'

@Resolver()
export class ExcelResolver {
   constructor(
      private readonly excelService: ExcelService,
      private readonly pubSub: PubSub,
   ) {}

   @Query(() => String )
   exportExcelBooks() {
      return this.excelService.exportListBook()
   }

   @Subscription(() => String, {
      filter: (payload, variables) => {
         return payload.excelId === variables.excelId
      },
   })
   excelExported(@Args('excelId', { type: () => ID }) excelId: string) {
      return this.pubSub.asyncIterator('excelExported')
   }
}
