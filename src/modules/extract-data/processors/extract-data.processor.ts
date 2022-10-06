import { Process, Processor } from '@nestjs/bull';

@Processor('extract-data')
export class ExtractDataProcessor {
  constructor() {}

  @Process()
  async handleExtractExcelFileFromData(data: []) {
    
  }
}
