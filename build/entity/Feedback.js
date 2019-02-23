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
const type_graphql_1 = require("type-graphql");
let Feedback = class Feedback extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Feedback.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.tickets, { lazy: true }),
    type_graphql_1.Field(() => User_1.User),
    __metadata("design:type", Object)
], Feedback.prototype, "user", void 0);
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Feedback.prototype, "message", void 0);
__decorate([
    typeorm_1.Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Feedback.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    type_graphql_1.Field(() => Boolean),
    __metadata("design:type", Boolean)
], Feedback.prototype, "active", void 0);
Feedback = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Feedback);
exports.Feedback = Feedback;