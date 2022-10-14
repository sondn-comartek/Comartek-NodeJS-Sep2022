import { Controller, Get, Post, Body, Patch, Param, Delete, Res, StreamableFile, Header, Query } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { Args } from '@nestjs/graphql';
import { query } from 'express';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Post('download/export-files')
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  @Header('Content-Disposition', 'attachment;')
  downloadFile(
    @Body() body: any
  ): StreamableFile {
    return this.fileService.createStreamabeFile(body.fileUrl);
  }


  @Get('hello')
  hello() {
    console.log("hello")
  }

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.fileService.create(createFileDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(+id);
  }
}
