import { Test, TestingModule } from '@nestjs/testing';
import { DeleteShipmentDto } from './dto/delete-shipment.dto';
import { ShipmentController } from './shipment.controller';
import { ShipmentService } from './shipment.service';

const mockData = {
  "data": {
    "quote": {
      "id": "6322d5df17e0f371b798b8e5"
    },
    "origin": {
      "contact": {
        "name": "La Redoute Contact",
        "email": "laredoute@example.com",
        "phone": "07 1234 5678"
      },
      "address": {
        "country_code": "FR",
        "locality": "Anzin",
        "postal_code": "59410",
        "address_line1": "Rue Jean Jaures"
      }
    },
    "destination": {
      "contact": {
        "name": "Marquise de Pompadour",
        "email": "marquise-de-pompadour@example.com",
        "phone": "07 9876 5432"
      },
      "address": {
        "country_code": "FR",
        "locality": "Marseille",
        "postal_code": "13006",
        "address_line1": "175 Rue de Rome"
      }
    },
    "package": {
      "dimensions": {
        "height": 10,
        "width": 10,
        "length": 10,
        "unit": "cm"
      },
      "grossWeight": {
        "amount": 8,
        "unit": "kg"
      }
    }
  }
}

describe('ShipmentController', () => {
  let shipmentController: ShipmentController;
  let shipmentService: ShipmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // controllers: [ShipmentController],
      providers: [{
        provide: ShipmentService,
        useValue: {
          create: jest.fn()
        }
      }],
    }).compile();

    shipmentController = module.get<ShipmentController>(ShipmentController);
    shipmentService = module.get<ShipmentService>(ShipmentService);
  });

  // describe('createshipment', () => {
  //   it('should call create for a shipment', async () => {
  //     shipmentController.create(mockData);
  //     expect(shipmentService.create).toHaveBeenCalled();
  //   })
  // });

  describe('getshipment', () => {
    it('should call findOne for a shipment',async () => {
      const queryParam = {
        "data": {
           "ref": "9801947431"
        }
      }
      shipmentController.findOne(queryParam);
      expect(shipmentService.findOne).toHaveBeenCalled();
    })
  });

  // describe('deleteshipment', () => {
  //   it('should call remove for a shipment',async () => {
  //     const deleteShipmentDto = {
  //       "data": {
  //          "ref": "9801947431"
  //       }
  //     }
  //     shipmentController.findOne(deleteShipmentDto);
  //     expect(shipmentService.remove).toHaveBeenCalled();
  //   })
  // });
});
