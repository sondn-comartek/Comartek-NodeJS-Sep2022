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
exports.UserService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var bcrypt_1 = require("bcrypt");
var user_entity_1 = require("./entities/user.entity");
var jwt = require("jsonwebtoken");
var UserService = /** @class */ (function () {
    function UserService(userModel) {
        this.userModel = userModel;
    }
    UserService.prototype.create = function (createUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            var password, dataReady, urModel, createdUser, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.hashPassword(createUserDto === null || createUserDto === void 0 ? void 0 : createUserDto.password)];
                    case 1:
                        password = _a.sent();
                        dataReady = __assign(__assign({}, createUserDto), { password: password });
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        urModel = new this.userModel(dataReady);
                        return [4 /*yield*/, urModel.save()];
                    case 3:
                        createdUser = _a.sent();
                        return [2 /*return*/, {
                                data: {
                                    message: 'create user success',
                                    user: createdUser
                                }
                            }];
                    case 4:
                        error_1 = _a.sent();
                        throw Error(error_1);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // hash password before insert into db
    UserService.prototype.hashPassword = function (password) {
        return __awaiter(this, void 0, void 0, function () {
            var salt, hashPass;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, bcrypt_1.genSalt)(10)];
                    case 1:
                        salt = _a.sent();
                        return [4 /*yield*/, (0, bcrypt_1.hash)(password, salt)];
                    case 2:
                        hashPass = _a.sent();
                        return [2 /*return*/, hashPass];
                }
            });
        });
    };
    UserService.prototype.findAll = function () {
        return "This action returns all user";
    };
    UserService.prototype.login = function (account) {
        return __awaiter(this, void 0, void 0, function () {
            var username, password, logger, isCompare, loginToken, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = account.username, password = account.password;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, this.userModel.findOne({ username: username })];
                    case 2:
                        logger = _a.sent();
                        return [4 /*yield*/, this.comparePassword(logger === null || logger === void 0 ? void 0 : logger.password, password)];
                    case 3:
                        isCompare = _a.sent();
                        if (!isCompare) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.signToken({
                                id: logger === null || logger === void 0 ? void 0 : logger._id,
                                username: logger === null || logger === void 0 ? void 0 : logger.username,
                                role: logger === null || logger === void 0 ? void 0 : logger.role
                            }, 'login')];
                    case 4:
                        loginToken = _a.sent();
                        return [2 /*return*/, {
                                data: {
                                    message: {
                                        status: 'login success',
                                        token: loginToken
                                    }
                                }
                            }];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        throw Error(error_2);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.comparePassword = function (passwordLogger, candidatePassword) {
        return __awaiter(this, void 0, void 0, function () {
            var isMatch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, bcrypt_1.compare)(candidatePassword, passwordLogger)];
                    case 1:
                        isMatch = _a.sent();
                        return [2 /*return*/, isMatch];
                }
            });
        });
    };
    UserService.prototype.signToken = function (info, typeToken) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, jwt.sign(__assign(__assign({}, info), { type: typeToken }), process.env.KEY, {
                            expiresIn: process.env.EXPIRE_TOKEN
                        })];
                    case 1:
                        token = _a.sent();
                        return [2 /*return*/, token];
                }
            });
        });
    };
    UserService.prototype.findOne = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isCompare;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne({ username: username })];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.comparePassword(user === null || user === void 0 ? void 0 : user.password, password)];
                    case 2:
                        isCompare = _a.sent();
                        if (isCompare) {
                            return [2 /*return*/, user];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    UserService.prototype.update = function (id, updateUserDto) {
        return "This action updates a #".concat(id, " user");
    };
    UserService.prototype.remove = function (id) {
        return "This action removes a #".concat(id, " user");
    };
    UserService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name))
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
