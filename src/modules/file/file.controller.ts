import { Controller, Get, Post, Body, Patch, Param, Delete, StreamableFile, Header, Res } from '@nestjs/common';
import { FileService } from './file.service';

import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  
  @Get(':id')
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  getFile(@Param('id') id: string) {
    const file = createReadStream(join(process.cwd(), `/csv/${id}.xlsx`))
    return new StreamableFile(file)
  }

  
}
