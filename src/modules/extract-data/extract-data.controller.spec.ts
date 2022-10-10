import { Test, TestingModule } from '@nestjs/testing';
import { ExtractDataController } from './extract-data.controller';

describe('ExtractDataController', () => {
  let controller: ExtractDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExtractDataController],
    }).compile();

    controller = module.get<ExtractDataController>(ExtractDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
