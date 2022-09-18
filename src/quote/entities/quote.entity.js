"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.QuoteSchema = exports.Quote = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var Quote = /** @class */ (function () {
    function Quote() {
    }
    __decorate([
        (0, mongoose_1.Prop)({ type: Object })
    ], Quote.prototype, "origin");
    __decorate([
        (0, mongoose_1.Prop)({ type: Object })
    ], Quote.prototype, "destination");
    __decorate([
        (0, mongoose_1.Prop)({ type: Object })
    ], Quote.prototype, "package");
    __decorate([
        (0, mongoose_1.Prop)({ type: Object })
    ], Quote.prototype, "grossWeight");
    Quote = __decorate([
        (0, mongoose_1.Schema)()
    ], Quote);
    return Quote;
}());
exports.Quote = Quote;
exports.QuoteSchema = mongoose_1.SchemaFactory.createForClass(Quote);
