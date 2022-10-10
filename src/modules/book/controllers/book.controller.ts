import { Controller, Get } from '@nestjs/common';
import { Media } from 'src/modules/media/schemas/media.schema';

@Controller('book')
export class BookController {
    @Get()
    async extractBookData(): Promise<Media> {
        return
    }
}
