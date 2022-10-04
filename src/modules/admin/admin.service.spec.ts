import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Book, BookSchema, BookDocument } from '../schema/book.schema';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { AdminService } from './admin.service';
import {JwtService } from '@nestjs/jwt';
import { AppModule } from '../../app.module';
import { UserSchema } from '../schema/user.schema';
import { AdminCreateBookInput } from './dto/admin.input';
describe('AdminService', () => {
  let service: AdminService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        AuthModule,
        MongooseModule.forFeature(
        [
          {
          name: 'book', schema: BookSchema
          },
        {
          name: 'user', schema: UserSchema
        }
        ]),
      ],
      providers: [AdminService, AuthService, JwtService],
    }).compile();
    service = module.get<AdminService>(AdminService);
  });

  it('return right format',async () => {
    const book: AdminCreateBookInput = {number: 1, name: "hary", categorys: ["adventure"]}
    let data = await service.AddBook(book)
    expect(data.length).toEqual(1)
    for(let i = 0;i < data.length; i++) {
      expect(!data).toEqual(false)
      expect(data instanceof Error).toEqual(false)
    }
    book.number = 5
    data = await service.AddBook(book)
    expect(data.length).toEqual(5)
  });
});
