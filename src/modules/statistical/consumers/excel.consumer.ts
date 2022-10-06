import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Excel } from 'src/helper/export.excel';

@Processor('excel')
export class ExcelConsumer {
  @Process('export')
  async export({ data }: Job<any>) {
    const { books, filename } = data;
    const BookExcel = new Excel('Books in store', books, filename);
    await BookExcel.export();
  }
}
