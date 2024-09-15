"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.QuoteModule = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var common_1 = require("@nestjs/common");
var quote_service_1 = require("./quote.service");
var quote_controller_1 = require("./quote.controller");
var quote_entity_1 = require("./entities/quote.entity");
var rate_entity_1 = require("./entities/rate.entity");
var QuoteModule = /** @class */ (function () {
    function QuoteModule() {
    }
    QuoteModule = __decorate([
        (0, common_1.Module)({
            imports: [mongoose_1.MongooseModule.forFeature([{ name: quote_entity_1.Quote.name, schema: quote_entity_1.QuoteSchema }, { name: rate_entity_1.Rate.name, schema: rate_entity_1.RateSchema }])],
            controllers: [quote_controller_1.QuoteController],
            providers: [quote_service_1.QuoteService]
        })
    ], QuoteModule);
    return QuoteModule;
}());
exports.QuoteModule = QuoteModule;
