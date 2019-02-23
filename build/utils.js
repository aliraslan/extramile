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
const type_graphql_1 = require("type-graphql");
let Point = class Point {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Float, { description: "longitude" }),
    __metadata("design:type", Number)
], Point.prototype, "x", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Float, { description: "latitude" }),
    __metadata("design:type", Number)
], Point.prototype, "y", void 0);
Point = __decorate([
    type_graphql_1.ObjectType(),
    type_graphql_1.InputType("LonLat")
], Point);
exports.Point = Point;
let TripStopInput = class TripStopInput {
};
__decorate([
    type_graphql_1.Field(() => Point),
    __metadata("design:type", Point)
], TripStopInput.prototype, "location", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], TripStopInput.prototype, "address", void 0);
TripStopInput = __decorate([
    type_graphql_1.InputType("TripStopInput")
], TripStopInput);
exports.TripStopInput = TripStopInput;
let TripLocation = class TripLocation {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", Number)
], TripLocation.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => Point),
    __metadata("design:type", Point)
], TripLocation.prototype, "location", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], TripLocation.prototype, "date", void 0);
TripLocation = __decorate([
    type_graphql_1.ObjectType()
], TripLocation);
exports.TripLocation = TripLocation;
