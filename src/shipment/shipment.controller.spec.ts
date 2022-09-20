import { Test, TestingModule } from '@nestjs/testing';
import { ShipmentController } from './shipment.controller';
import { ShipmentService } from './shipment.service';
import { ShipmentServiceProvider } from './shipment.service.spec';

describe('ShipmentController', () => {
  let controller: ShipmentController;
  let service: ShipmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShipmentController],
      providers: [ShipmentServiceProvider],
    }).compile();

    controller = await module.resolve(ShipmentController);
    service = await module.resolve(ShipmentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
