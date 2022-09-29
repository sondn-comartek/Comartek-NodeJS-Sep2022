import { Test, TestingModule } from '@nestjs/testing';
import { BookItemsResolver } from './book-items.resolver';
import { BookItemsService } from './book-items.service';

describe('BookItemsResolver', () => {
  let resolver: BookItemsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookItemsResolver, BookItemsService],
    }).compile();

    resolver = module.get<BookItemsResolver>(BookItemsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
