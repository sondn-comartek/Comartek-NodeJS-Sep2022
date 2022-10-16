import { Process, Processor } from '@nestjs/bull'
import { ConfigService } from '@nestjs/config'
import { Job } from 'bull'
import { PubSub } from 'graphql-subscriptions'
import { exportHelper } from './helpers'

@Processor('excel')
export class ExcelConsumer {
   private exportHelper = exportHelper
   constructor(
      private readonly pubSub: PubSub,
      private configService: ConfigService,
   ) {}
   @Process('export')
   async export({ data }: Job<any>) {
      const excelId = await this.exportHelper(
         data.docs,
         data.id,
         data.columnTemplate,
      )
      this.pubSub.publish('excelExported', {
         excelId: excelId,
         exel_url:
            this.configService.get<'string'>('HOST_URL') + 'excels/' + excelId,
      })
   }
}
