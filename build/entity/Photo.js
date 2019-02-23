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
const type_graphql_1 = require("type-graphql");
const Field_1 = require("type-graphql/decorators/Field");
let Photo = class Photo extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    Field_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", Number)
], Photo.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToOne(() => Account_1.Account, (owner) => owner.photo),
    Field_1.Field(() => Account_1.Account),
    __metadata("design:type", Account_1.Account)
], Photo.prototype, "owner", void 0);
__decorate([
    typeorm_1.Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    Field_1.Field(),
    __metadata("design:type", String)
], Photo.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    Field_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Photo.prototype, "height", void 0);
__decorate([
    typeorm_1.Column(),
    Field_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Photo.prototype, "width", void 0);
__decorate([
    typeorm_1.Column(),
    Field_1.Field(),
    __metadata("design:type", String)
], Photo.prototype, "URI", void 0);
Photo = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Photo);
exports.Photo = Photo;
