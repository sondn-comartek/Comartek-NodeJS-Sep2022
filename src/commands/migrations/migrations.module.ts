import { BullModule } from '@nestjs/bull';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from 'src/module/books/entities/book.entity';
import { CategorySchema } from 'src/module/categories/entities/category.entity';
import { ImageSchema } from 'src/module/images/entities/image.entity';
import { NotificationSchema } from 'src/module/notification/entities/notification.entity';
import { RentBookSchema } from 'src/module/rent/entities/rent.entity';
import { UserSchema } from 'src/module/users/entities/user.entity';
import { Migration } from './migrations.command';
import { MigrationSchema } from './migrations.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Migration', schema: MigrationSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
    MongooseModule.forFeature([{name: 'Category', schema: CategorySchema}]),
    MongooseModule.forFeature([{name: 'Image', schema: ImageSchema}]),
    MongooseModule.forFeature([{name: 'Notification', schema: NotificationSchema}]),
    MongooseModule.forFeature([
      {name: 'RentBook', schema: RentBookSchema}
    ]),
    
    // forwardRef(() => ReportsModule),
    // forwardRef(() => RestaurantModule),
    BullModule.registerQueue({
      name: 'migrateData',
    }),
  ],
  providers: [Migration],
})
export class MigrationModule {}
