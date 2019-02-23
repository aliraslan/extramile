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
const User_1 = require("./User");
const Trip_1 = require("./Trip");
const Enums_1 = require("../Enums");
const utils_1 = require("../utils");
const type_graphql_1 = require("type-graphql");
let Reservation = class Reservation extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Reservation.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Reservation.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Reservation.prototype, "pickupTime", void 0);
__decorate([
    typeorm_1.Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: true }),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Reservation.prototype, "dropOffTime", void 0);
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Reservation.prototype, "pickupAddress", void 0);
__decorate([
    typeorm_1.Column("point", {
        transformer: {
            from: p => p,
            to: p => `${p.x},${p.y}`
        }
    }),
    type_graphql_1.Field(() => utils_1.Point),
    __metadata("design:type", utils_1.Point)
], Reservation.prototype, "pickupLocation", void 0);
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Reservation.prototype, "dropOffAddress", void 0);
__decorate([
    typeorm_1.Column("point", {
        transformer: {
            from: p => p,
            to: p => `${p.x},${p.y}`
        }
    }),
    type_graphql_1.Field(() => utils_1.Point),
    __metadata("design:type", utils_1.Point)
], Reservation.prototype, "dropOffLocation", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.reservations, { lazy: true }),
    type_graphql_1.Field(() => User_1.User),
    __metadata("design:type", Object)
], Reservation.prototype, "user", void 0);
__decorate([
    typeorm_1.Column("uuid"),
    __metadata("design:type", String)
], Reservation.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Trip_1.Trip, (trip) => trip.reservations, { lazy: true }),
    type_graphql_1.Field(() => Trip_1.Trip),
    __metadata("design:type", Object)
], Reservation.prototype, "trip", void 0);
__decorate([
    typeorm_1.Column("uuid"),
    __metadata("design:type", String)
], Reservation.prototype, "tripId", void 0);
__decorate([
    typeorm_1.Column("enum", { enum: Enums_1.ReservationStatus, default: Enums_1.ReservationStatus.Planned }),
    type_graphql_1.Field(() => Enums_1.ReservationStatus),
    __metadata("design:type", String)
], Reservation.prototype, "status", void 0);
Reservation = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Reservation);
exports.Reservation = Reservation;
