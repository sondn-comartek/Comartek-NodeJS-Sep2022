import { Test, TestingModule } from '@nestjs/testing';
import { ManagePetResolver } from './manage-pet.resolver';
import { ManagePetService } from './manage-pet.service';

describe('ManagePetResolver', () => {
  let resolver: ManagePetResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagePetResolver, ManagePetService],
    }).compile();

    resolver = module.get<ManagePetResolver>(ManagePetResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
