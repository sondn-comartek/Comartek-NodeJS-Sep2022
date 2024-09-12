import { UseGuards, Controller, Get, StreamableFile, Header } from "@nestjs/common";
import { createReadStream } from 'fs';
import { join } from 'path';
import { CurrentUser } from "../auth/decorator/currentuser.decorator";
import { Roles } from "../auth/decorator/roles.decorator";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { RolesGuard } from "../auth/guard/roles.guard";
import { Role } from "../auth/role/role.enum";
import { BookService } from "./book.service";

@Controller('books')
export class BookController {
    constructor(private bookService: BookService) { }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Get('exportExcel')
    @Header('Content-Type', `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`)

    async getFile(@CurrentUser() user: any) {
        await this.bookService.exportExcel(user.id)
        const file = createReadStream(`./src/modules/book/excel/ExportBooksExcel.xlsx`);
        return new StreamableFile(file);
    }


}