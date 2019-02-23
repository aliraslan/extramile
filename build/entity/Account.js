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
const type_graphql_1 = require("type-graphql");
const JoinColumn_1 = require("typeorm/decorator/relations/JoinColumn");
const Photo_1 = require("./Photo");
let Account = class Account extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Account.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Account.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column({ length: 64 }),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Account.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column({ length: 64 }),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Account.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column({ length: 32, unique: true }),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Account.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({ type: "date", nullable: true }),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Account.prototype, "dateOfBirth", void 0);
__decorate([
    typeorm_1.Column({ length: 256, nullable: true }),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Account.prototype, "homeAddress", void 0);
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
], Account.prototype, "homeLocation", void 0);
__decorate([
    typeorm_1.OneToOne(() => Photo_1.Photo, (photo) => photo.owner, { nullable: true }),
    type_graphql_1.Field(() => Photo_1.Photo, { nullable: true }),
    JoinColumn_1.JoinColumn(),
    __metadata("design:type", Photo_1.Photo)
], Account.prototype, "photo", void 0);
Account = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.InterfaceType()
], Account);
exports.Account = Account;
