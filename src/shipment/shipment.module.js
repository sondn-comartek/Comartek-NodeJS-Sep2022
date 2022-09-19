"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShipmentModule = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var common_1 = require("@nestjs/common");
var shipment_service_1 = require("./shipment.service");
var shipment_controller_1 = require("./shipment.controller");
var shipment_entity_1 = require("./entities/shipment.entity");
var ShipmentModule = /** @class */ (function () {
    function ShipmentModule() {
    }
    ShipmentModule = __decorate([
        (0, common_1.Module)({
            imports: [mongoose_1.MongooseModule.forFeature([{ name: shipment_entity_1.Shipment.name, schema: shipment_entity_1.ShipmentSchema }])],
            controllers: [shipment_controller_1.ShipmentController],
            providers: [shipment_service_1.ShipmentService]
        })
    ], ShipmentModule);
    return ShipmentModule;
}());
exports.ShipmentModule = ShipmentModule;
