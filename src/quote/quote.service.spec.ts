import { Test, TestingModule } from '@nestjs/testing';
import { QuoteService } from './quote.service';

const exampleGetQuoteResponse = {
  id: '0000000000',
  amount: 100,
};

export const mockQuoteService = {
  getQuote: jest.fn(),
};

export const QuoteServiceProvider = {
  provide: QuoteService,
  useValue: mockQuoteService,
};

describe('QuoteService', () => {
  let service: QuoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuoteServiceProvider],
    }).compile();

    service = module.get<QuoteService>(QuoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getQuote()', () => {
    it('it should be called', () => {});

    it('should return an object with 2 properties: id && amount', () => {});
  });
});
