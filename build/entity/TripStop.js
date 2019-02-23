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
const type_graphql_1 = require("type-graphql");
const utils_1 = require("../utils");
const Trip_1 = require("./Trip");
let TripStop = class TripStop extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], TripStop.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], TripStop.prototype, "address", void 0);
__decorate([
    typeorm_1.Column({
        type: "point", transformer: {
            from: p => p,
            to: p => `${p.x},${p.y}`
        }
    }),
    type_graphql_1.Field(() => utils_1.Point),
    __metadata("design:type", utils_1.Point)
], TripStop.prototype, "location", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Trip_1.Trip, (trip) => trip.stops, { lazy: true, nullable: true }),
    type_graphql_1.Field(() => Trip_1.Trip, { nullable: true }),
    __metadata("design:type", Object)
], TripStop.prototype, "trip", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], TripStop.prototype, "tripId", void 0);
TripStop = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], TripStop);
exports.TripStop = TripStop;
