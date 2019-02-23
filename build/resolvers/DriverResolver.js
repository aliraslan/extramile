"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const Driver_1 = require("../entity/Driver");
let DriverResolver = class DriverResolver {
    createDriver(firstName, lastName, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Driver_1.Driver.create({ lastName, firstName, phone }).save();
        });
    }
    drivers(take, skip) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Driver_1.Driver.find({ take, skip });
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Driver_1.Driver),
    __param(0, type_graphql_1.Arg("firstName")),
    __param(1, type_graphql_1.Arg("lastName")),
    __param(2, type_graphql_1.Arg("phone")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], DriverResolver.prototype, "createDriver", null);
__decorate([
    type_graphql_1.Query(() => [Driver_1.Driver]),
    __param(0, type_graphql_1.Arg("take", { defaultValue: 100 })),
    __param(1, type_graphql_1.Arg("skip", { defaultValue: 0 })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], DriverResolver.prototype, "drivers", null);
DriverResolver = __decorate([
    type_graphql_1.Resolver()
], DriverResolver);
exports.DriverResolver = DriverResolver;
