import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { categorySchema } from './model/category.model';
import { BullModule } from '@nestjs/bull';
import { FileUploadModule } from 'src/modules/fileupload/fileupload.module';
import { CategoryConsumer } from './catagory.consumer';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Category', schema: categorySchema }]),
        BullModule.registerQueue({
            name: 'category',
        }),
        FileUploadModule
    ],
    providers: [{
        provide: APP_INTERCEPTOR,
        useClass: DataLoaderInterceptor,
    },
        CategoryService, CategoryResolver, CategoryConsumer],
    exports: [CategoryService]
})
export class CategoryModule { }