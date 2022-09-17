import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";

export const mockUserService = {
  findUserById: jest.fn(),
  findUserByEmail: jest.fn(),
  createUser: jest.fn(),
};

export const UserServiceProvider = {
  provide: UserService,
  useValue: mockUserService,
};

describe("UserService", () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserServiceProvider],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
