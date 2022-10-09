import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { PubSub } from 'graphql-subscriptions'
import { exportHelper } from './helpers'

@Processor('excel')
export class ExcelConsumer {
   private exportHelper = exportHelper
   constructor(private readonly pubSub: PubSub) {}
   @Process('export')
   async export({ data }: Job<any>) {
      const excelId = await this.exportHelper(
         data.docs,
         data.id,
         data.columnTemplate,
      )
      this.pubSub.publish('excelExported', {
         excelId: excelId,
         success: true,
      })
   }
}
