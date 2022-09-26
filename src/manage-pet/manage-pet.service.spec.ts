import { Test, TestingModule } from '@nestjs/testing';
import { ManagePetService } from './manage-pet.service';

describe('ManagePetService', () => {
  let service: ManagePetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagePetService],
    }).compile();

    service = module.get<ManagePetService>(ManagePetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
