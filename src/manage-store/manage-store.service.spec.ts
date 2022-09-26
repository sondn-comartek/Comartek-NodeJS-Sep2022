import { Test, TestingModule } from '@nestjs/testing';
import { ManageStoreService } from './manage-store.service';

describe('ManageStoreService', () => {
  let service: ManageStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageStoreService],
    }).compile();

    service = module.get<ManageStoreService>(ManageStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
