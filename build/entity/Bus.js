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
const typeorm_1 = require("typeorm");
const Trip_1 = require("./Trip");
const Enums_1 = require("../Enums");
const type_graphql_1 = require("type-graphql");
let Bus = class Bus extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", Number)
], Bus.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("smallint"),
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Bus.prototype, "capacity", void 0);
__decorate([
    typeorm_1.Column("smallint"),
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Bus.prototype, "numberOfSeats", void 0);
__decorate([
    typeorm_1.Column({ type: "enum", enum: Enums_1.BusType, nullable: false }),
    type_graphql_1.Field(() => Enums_1.BusType),
    __metadata("design:type", String)
], Bus.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, unique: true }),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Bus.prototype, "licensePlate", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Bus.prototype, "make", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Bus.prototype, "model", void 0);
__decorate([
    typeorm_1.OneToMany(() => Trip_1.Trip, (trip) => trip.bus, { lazy: true }),
    type_graphql_1.Field(() => [Trip_1.Trip]),
    __metadata("design:type", Object)
], Bus.prototype, "trips", void 0);
Bus = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Bus);
exports.Bus = Bus;
