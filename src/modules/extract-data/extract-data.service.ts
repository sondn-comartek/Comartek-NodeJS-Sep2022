import { MediaService } from './../media/media.service';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { BookService } from '../book/book.service';
import { Media } from '../media/schemas/media.schema';

@Injectable()
export class ExtractDataService {
  constructor(
    private readonly bookService: BookService,
    @InjectQueue('extract-data') private readonly extractDataQueue: Queue,
    private readonly mediaService: MediaService,
  ) {}

  async extractBookData(): Promise<Media> {
    const books = await this.bookService.findAll();
    const media = await this.mediaService.create({ mimetype: 'xls' });

    await this.extractDataQueue.add('handleExtractExcelFileFromData', {
      dataToExtracted: books,
      media,
    });

    return media;
  }
}
