import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from 'src/modules/category/category.module';
import { FileUploadModule } from 'src/modules/fileupload/fileupload.module';
import { BookConsumer } from './book.consumer';
import { BookController } from './book.controller';
import { BookResolver } from './book.resolver';
import { BookService } from './book.service';
import { bookSchema } from './model/book.model';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Book', schema: bookSchema }]),
        BullModule.registerQueue({
            name: 'book',
        }),
        CategoryModule,
        FileUploadModule
    ],
    providers: [BookService, BookResolver, BookConsumer],
    controllers: [BookController],
    exports: [BookService]
})
export class BookModule { }