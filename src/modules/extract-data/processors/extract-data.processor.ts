import { PubSubService } from './../../pubsub/pubsub.service';
import { ExcelService } from './../../excel/excel.service';
// import { MediaService } from './../../media/media.service';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import * as fs from 'fs';

const EXCEL_STORE_PATH = 'store/excel';

@Processor('extract-data')
export class ExtractDataProcessor {
  constructor(
    // private readonly mediaService: MediaService,
    private readonly excelService: ExcelService,
    private readonly pubSubService: PubSubService,
  ) {}

  @Process('handleExtractExcelFileFromData')
  async handleExtractExcelFileFromData(job: Job) {
    const { dataToExtracted, media } = job.data;

    await this.excelService.createExcelFile(dataToExtracted, media);

    const bufferExcelData = fs.readFileSync(
      `${EXCEL_STORE_PATH}/${media._id.toString()}.${media.mimetype}`,
    );

    await this.pubSubService.registerEvent('dataExtracted', {
      bufferExcelData,
    });

    return 'DONE';
  }
}
