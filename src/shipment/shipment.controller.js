"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.ShipmentController = void 0;
var common_1 = require("@nestjs/common");
var ShipmentController = /** @class */ (function () {
    function ShipmentController(shipmentService) {
        this.shipmentService = shipmentService;
    }
    ShipmentController.prototype.create = function (createShipmentDto) {
        return this.shipmentService.create(createShipmentDto);
    };
    ShipmentController.prototype.findAll = function () {
        return this.shipmentService.findAll();
    };
    ShipmentController.prototype.findOne = function (ref) {
        return this.shipmentService.findOne(ref);
    };
    ShipmentController.prototype.update = function (id, updateShipmentDto) {
        return this.shipmentService.update(+id, updateShipmentDto);
    };
    ShipmentController.prototype.remove = function (ref) {
        return this.shipmentService.remove(ref);
    };
    __decorate([
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)())
    ], ShipmentController.prototype, "create");
    __decorate([
        (0, common_1.Get)()
    ], ShipmentController.prototype, "findAll");
    __decorate([
        (0, common_1.Get)(':ref'),
        __param(0, (0, common_1.Param)('ref'))
    ], ShipmentController.prototype, "findOne");
    __decorate([
        (0, common_1.Patch)(':id'),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)())
    ], ShipmentController.prototype, "update");
    __decorate([
        (0, common_1.Delete)(':ref'),
        __param(0, (0, common_1.Param)('ref'))
    ], ShipmentController.prototype, "remove");
    ShipmentController = __decorate([
        (0, common_1.Controller)('shipment')
    ], ShipmentController);
    return ShipmentController;
}());
exports.ShipmentController = ShipmentController;
