import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { User, UserSchema } from '../user/schemas/user.schema';
import { Category, CategorySchema } from '../category/schemas/category.schema';
import { Rent, RentSchema } from '../rent/schemas/rent.schema';
import { Book, BookSchema } from '../book/schemas/book.schema';
import { Media, MediaSchema } from '../media/schemas/media.schema';
import {
  Notification,
  NotificationSchema,
} from '../notification/schemas/notification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Category.name,
        schema: CategorySchema,
      },
      {
        name: Rent.name,
        schema: RentSchema,
      },
      {
        name: Book.name,
        schema: BookSchema,
      },
      {
        name: Media.name,
        schema: MediaSchema,
      },
      {
        name: Notification.name,
        schema: NotificationSchema,
      },
    ]),
  ],
})
export class MigrationModule {}
