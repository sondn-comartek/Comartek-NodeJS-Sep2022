import { Test, TestingModule } from '@nestjs/testing';
import { BookItemsService } from './book-items.service';

describe('BookItemsService', () => {
  let service: BookItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookItemsService],
    }).compile();

    service = module.get<BookItemsService>(BookItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
