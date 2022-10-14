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
    MongooseModule.forFeature([
      { name: 'Migration', schema: MigrationSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Book', schema: BookSchema },
      { name: 'Category', schema: CategorySchema },
      { name: 'Image', schema: ImageSchema },
      { name: 'Notification', schema: NotificationSchema },
      { name: 'RentBook', schema: RentBookSchema }
    ]),
    BullModule.registerQueue({
      name: 'migrateData',
    }),
  ],
  providers: [Migration],
})
export class MigrationModule {}
