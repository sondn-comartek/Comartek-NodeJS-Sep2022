import { join } from 'path';
import { Controller, Get, Header, StreamableFile } from '@nestjs/common';
import * as fs from 'fs';

@Controller('extract-data')
export class ExtractDataController {
  @Get('book')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  getStaticFile(): StreamableFile {
    const file = fs.createReadStream(
      join(process.cwd(), 'store/excel/books.xls'),
    );

    return new StreamableFile(file);
  }
}
