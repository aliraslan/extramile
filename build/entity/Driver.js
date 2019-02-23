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
Object.defineProperty(exports, "__esModule", { value: true });
const Account_1 = require("./Account");
const typeorm_1 = require("typeorm");
const Trip_1 = require("./Trip");
const type_graphql_1 = require("type-graphql");
let Driver = class Driver extends Account_1.Account {
};
__decorate([
    typeorm_1.OneToMany(() => Trip_1.Trip, (trip) => trip.driver, { lazy: true }),
    type_graphql_1.Field(() => [Trip_1.Trip]),
    __metadata("design:type", Object)
], Driver.prototype, "trips", void 0);
Driver = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType({ implements: Account_1.Account })
], Driver);
exports.Driver = Driver;
