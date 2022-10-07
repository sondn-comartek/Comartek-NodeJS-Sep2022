import { OnGlobalQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { exportBooksFile } from 'src/utils/excel';
import { convertImage } from 'src/utils/image';

@Processor('book')
export class BookConsumer {
  @OnGlobalQueueCompleted()
  async onGlobalCompleted(jobId: number, result: any) {
    // console.log('result: ' + result);
    return result;
  }

  @Process('convertBookImage')
  async convertImage(job: Job) {
    // console.log('job data: ', job.data);
    const { filename, name, widthImage } = job.data;
    await convertImage(filename, name, widthImage);
  }

  @Process('exportBooks')
  async exportBooks(job: Job) {
    // console.log('job data: ', job.data);
    const { books } = job.data;

    const nameSheet = 'Books List';

    const columns = [
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

    const exportPath = './src/stores/exports/books/books.xlsx';

    await exportBooksFile(books, nameSheet, columns, exportPath);
  }
}
