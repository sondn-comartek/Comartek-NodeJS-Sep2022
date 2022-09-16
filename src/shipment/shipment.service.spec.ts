import { Test, TestingModule } from "@nestjs/testing";
import { ShipmentService } from "./shipment.service";

export const mockShipmentService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOneByRef: jest.fn(),
  deleteByRef: jest.fn()
}

export const ShipmentServiceProvider = {
  provide: ShipmentService,
  useValue: mockShipmentService,
};

describe("ShipmentService", () => {
  let service: ShipmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShipmentServiceProvider],
    }).compile();

    service = module.get<ShipmentService>(ShipmentService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
