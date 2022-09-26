import { Test, TestingModule } from '@nestjs/testing';
import { ManageStoreResolver } from './manage-store.resolver';
import { ManageStoreService } from './manage-store.service';

describe('ManageStoreResolver', () => {
  let resolver: ManageStoreResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageStoreResolver, ManageStoreService],
    }).compile();

    resolver = module.get<ManageStoreResolver>(ManageStoreResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
