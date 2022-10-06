import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { exportHelper } from './helpers'

@Processor('excel')
export class ExcelConsumer {
   private exportHelper = exportHelper
   constructor() {}
   @Process('export')
   export( { data }: Job<any>) {
      return this.exportHelper(data.docs, data.id, data.columnTemplate)
   }
}
