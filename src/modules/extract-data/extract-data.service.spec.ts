import { Test, TestingModule } from '@nestjs/testing';
import { ExtractDataService } from './extract-data.service';

describe('ExtractDataService', () => {
  let service: ExtractDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExtractDataService],
    }).compile();

    service = module.get<ExtractDataService>(ExtractDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
