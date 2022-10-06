import { Book, BookSchema } from './../../modules/book/entities/book.entity';
import { UserModule } from './../../modules/user/user.module';
import { Module } from '@nestjs/common';
import { MigrationService } from './migration.service';
import { BookModule } from 'src/modules/book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/modules/user/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Book.name, schema: BookSchema },
    ]),
    UserModule,
    BookModule,
  ],
  providers: [MigrationService],
})
export class MigrationModule {}
