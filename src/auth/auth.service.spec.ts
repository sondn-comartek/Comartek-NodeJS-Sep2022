import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

export const mockAuthService = {
  login: jest.fn(),
  register: jest.fn()
}

export const AuthServiceProvider = {
  provide: AuthService,
  useValue: mockAuthService
}

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthServiceProvider],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
