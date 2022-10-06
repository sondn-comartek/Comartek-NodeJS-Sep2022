import { Book, BookSchema } from './../../modules/book/entities/book.entity';
import { UserModule } from './../../modules/user/user.module';
import { Module } from '@nestjs/common';
import { BookModule } from 'src/modules/book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/modules/user/entities/user.entity';
import { BullModule } from '@nestjs/bull';
import { Migration } from './migrations.command';
import { MigrationSchema } from './migration.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Book.name, schema: BookSchema },
      { name: 'Migration', schema: MigrationSchema },
    ]),
    UserModule,
    BookModule,
    BullModule.registerQueue({
      name: 'migrateData',
    }),
  ],
  providers: [Migration],
})
export class MigrationModule {}
