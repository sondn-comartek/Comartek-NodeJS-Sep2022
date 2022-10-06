import { OnGlobalQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { HelpersService } from '../../helpers/helpers.service';
import * as Excel from 'exceljs';

@Processor('book')
export class BookConsumer {
  constructor(private readonly helpersService: HelpersService) {}

  @OnGlobalQueueCompleted()
  async onGlobalCompleted(jobId: number, result: any) {
    // console.log('result: ' + result);
    return result;
  }

  @Process('convertBookImage')
  async convertImage(job: Job) {
    // console.log('job data: ', job.data);
    const { filename, name, widthImage } = job.data;
    await this.helpersService.convertImage(filename, name, widthImage);
  }

  @Process('exportBooks')
  async exportBooks(job: Job) {
    // console.log('job data: ', job.data);
    const { books } = job.data;
    const exportBooksFile = async () => {
      const workbook = new Excel.Workbook();
      const worksheet = workbook.addWorksheet('Books List');

      worksheet.columns = [
        { key: 'id', header: 'ID' },
        { key: 'categoryId', header: 'Category ID' },
        { key: 'name', header: 'Name' },
        { key: 'part', header: 'Part' },
        { key: 'numberOfPages', header: 'Number Of Pages' },
        { key: 'quantity', header: 'Quantity' },
        { key: 'imageId', header: 'Image ID' },
        { key: 'createdAt', header: 'Created At' },
        { key: 'updatedAt', header: 'Updated At' },
      ];

      books.forEach((book) => {
        worksheet.addRow(book);
      });

      const exportPath = './src/stores/exports/books/books.xlsx';

      await workbook.xlsx.writeFile(exportPath);
    };

    await exportBooksFile();
  }
}
