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
const utils_1 = require("../utils");
const Feedback_1 = require("./Feedback");
const Account_1 = require("./Account");
const Reservation_1 = require("./Reservation");
const type_graphql_1 = require("type-graphql");
let User = class User extends Account_1.Account {
};
__decorate([
    typeorm_1.Column({ unique: true }),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ length: 256, nullable: true }),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "workAddress", void 0);
__decorate([
    typeorm_1.Column({
        type: "point",
        nullable: true,
        transformer: {
            from: p => p,
            to: p => p ? `${p.x},${p.y}` : null
        }
    }),
    type_graphql_1.Field(() => utils_1.Point, { nullable: true }),
    __metadata("design:type", utils_1.Point)
], User.prototype, "workLocation", void 0);
__decorate([
    typeorm_1.OneToMany(() => Reservation_1.Reservation, (reservation) => reservation.user, { lazy: true }),
    type_graphql_1.Field(() => [Reservation_1.Reservation]),
    __metadata("design:type", Object)
], User.prototype, "reservations", void 0);
__decorate([
    typeorm_1.OneToMany(() => Feedback_1.Feedback, (ticket) => ticket.user, { lazy: true }),
    type_graphql_1.Field(() => [Feedback_1.Feedback]),
    __metadata("design:type", Object)
], User.prototype, "tickets", void 0);
User = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType({ implements: Account_1.Account })
], User);
exports.User = User;
