import {
  Controller,
  Get,
  Header,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Role } from 'src/modules/users/enums/role.enum';

@Controller('books')
export class BooksController {
  @UseGuards(JwtAuthGuard)
  @Get()
  @Roles(Role.Admin)
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  @Header('Content-Disposition', 'attachment; filename="books.xlsx"')
  getFile(): StreamableFile {
    const file = createReadStream(
      join(process.cwd(), '/src/stores/exports/books/books.xlsx'),
    );
    return new StreamableFile(file);
  }
}
