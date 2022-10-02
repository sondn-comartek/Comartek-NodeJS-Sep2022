import { Test, TestingModule } from '@nestjs/testing';
import { StatisticalResolver } from './statistical.resolver';

describe('StatisticalResolver', () => {
  let resolver: StatisticalResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatisticalResolver],
    }).compile();

    resolver = module.get<StatisticalResolver>(StatisticalResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
