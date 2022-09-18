"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ShipmentService = void 0;
var shipment_entity_1 = require("./entities/shipment.entity");
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var ShipmentService = /** @class */ (function () {
    function ShipmentService(shipmentModel) {
        this.shipmentModel = shipmentModel;
    }
    ShipmentService.prototype.create = function (createShipmentDto) {
        var _a;
        var _b = (_a = createShipmentDto === null || createShipmentDto === void 0 ? void 0 : createShipmentDto.data) === null || _a === void 0 ? void 0 : _a.quote, quoteID = _b.id, price = _b.price;
        var refString = this.genRandString(10);
        try {
            var shipmentMode = new this.shipmentModel({
                quote_id: quoteID,
                ref: refString,
                cost: price
            });
            var createdShipment = shipmentMode.save();
            return createdShipment;
        }
        catch (error) {
            console.log(error);
            return 'oop something wrong';
        }
    };
    ShipmentService.prototype.genRandString = function (length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
    ShipmentService.prototype.findAll = function () {
        return "This action returns all shipment";
    };
    ShipmentService.prototype.findOne = function (ref) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var result, shipment, quoteResult, quoteDetail, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.shipmentModel
                                .aggregate([
                                {
                                    $match: { ref: ref }
                                },
                                {
                                    $lookup: {
                                        from: 'quotes',
                                        localField: 'quotes._id',
                                        foreignField: 'quote._id',
                                        as: 'quote'
                                    }
                                },
                            ])
                                .exec()];
                    case 1:
                        result = _b.sent();
                        if (result) {
                            shipment = result[0];
                            quoteResult = (_a = result[0]) === null || _a === void 0 ? void 0 : _a.quote;
                            quoteDetail = quoteResult[0];
                            return [2 /*return*/, {
                                    data: __assign({ ref: shipment === null || shipment === void 0 ? void 0 : shipment.ref }, quoteDetail)
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    data: {
                                        ref: ''
                                    }
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        return [2 /*return*/, {
                                message: {
                                    status: 404,
                                    error: error_1
                                }
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ShipmentService.prototype.update = function (id, updateShipmentDto) {
        return "This action updates a #".concat(id, " shipment");
    };
    ShipmentService.prototype.remove = function (ref) {
        return __awaiter(this, void 0, void 0, function () {
            var deletedShipment, deleteCounter, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.shipmentModel.deleteOne({ ref: ref })];
                    case 1:
                        deletedShipment = _a.sent();
                        deleteCounter = deletedShipment === null || deletedShipment === void 0 ? void 0 : deletedShipment.deletedCount;
                        if (deleteCounter > 0) {
                            return [2 /*return*/, {
                                    data: {
                                        status: 'OK',
                                        message: 'delete shipment success'
                                    }
                                }];
                        }
                        return [2 /*return*/, {
                                data: {
                                    status: 'NOK',
                                    message: 'shipment not found'
                                }
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw Error(error_2);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ShipmentService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, mongoose_1.InjectModel)(shipment_entity_1.Shipment.name))
    ], ShipmentService);
    return ShipmentService;
}());
exports.ShipmentService = ShipmentService;
