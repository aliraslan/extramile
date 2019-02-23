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
const Bus_1 = require("./Bus");
const Driver_1 = require("./Driver");
const Reservation_1 = require("./Reservation");
const Enums_1 = require("../Enums");
const type_graphql_1 = require("type-graphql");
const TripStop_1 = require("./TripStop");
let Trip = class Trip extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Trip.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("timestamp"),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Trip.prototype, "startedAt", void 0);
__decorate([
    typeorm_1.Column("timestamp", { nullable: true }),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Trip.prototype, "completedAt", void 0);
__decorate([
    typeorm_1.Column("enum", {
        default: Enums_1.TripStatus.Planned,
        nullable: false,
        enum: Enums_1.TripStatus
    }),
    type_graphql_1.Field(() => Enums_1.TripStatus),
    __metadata("design:type", String)
], Trip.prototype, "status", void 0);
__decorate([
    typeorm_1.OneToMany(() => TripStop_1.TripStop, (stop) => stop.trip, { lazy: true }),
    type_graphql_1.Field(() => [TripStop_1.TripStop]),
    __metadata("design:type", Object)
], Trip.prototype, "stops", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Bus_1.Bus, (bus) => bus.trips, { lazy: true }),
    type_graphql_1.Field(() => Bus_1.Bus),
    __metadata("design:type", Object)
], Trip.prototype, "bus", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Trip.prototype, "busId", void 0);
__decorate([
    typeorm_1.OneToMany(() => Reservation_1.Reservation, (reservation) => reservation.trip, { lazy: true }),
    type_graphql_1.Field(() => [Reservation_1.Reservation]),
    __metadata("design:type", Object)
], Trip.prototype, "reservations", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Driver_1.Driver, (driver) => driver.trips, { lazy: true }),
    type_graphql_1.Field(() => Driver_1.Driver),
    __metadata("design:type", Object)
], Trip.prototype, "driver", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Trip.prototype, "driverId", void 0);
Trip = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Trip);
exports.Trip = Trip;
