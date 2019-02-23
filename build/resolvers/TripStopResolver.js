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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const Mutation_1 = require("type-graphql/decorators/Mutation");
const TripStop_1 = require("../entity/TripStop");
const Arg_1 = require("type-graphql/decorators/Arg");
const utils_1 = require("../utils");
const Trip_1 = require("../entity/Trip");
const Enums_1 = require("../Enums");
const typeorm_1 = require("typeorm");
const moment = require("moment");
const geokdbush = require("geokdbush");
const kdbush = require("kdbush");
let TripStopResolver = class TripStopResolver {
    createStop(location, address) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(location);
            return yield TripStop_1.TripStop.create({ location, address }).save();
        });
    }
    StopsByLocation(location, count) {
        return __awaiter(this, void 0, void 0, function* () {
            const trips = yield Trip_1.Trip.find({
                where: {
                    status: Enums_1.TripStatus.Planned,
                    startedAt: typeorm_1.LessThan(moment().add(2, "days"))
                },
                relations: ["stops"]
            });
            const stops = (yield Promise.all(trips.map(({ stops }) => stops))).flat();
            const index = new kdbush(stops, (s) => s.location.x, (s) => s.location.y);
            return geokdbush.around(index, location.x, location.y, count);
        });
    }
};
__decorate([
    Mutation_1.Mutation(() => TripStop_1.TripStop),
    __param(0, Arg_1.Arg("location", () => utils_1.Point)),
    __param(1, Arg_1.Arg("address")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [utils_1.Point, String]),
    __metadata("design:returntype", Promise)
], TripStopResolver.prototype, "createStop", null);
__decorate([
    type_graphql_1.Query(() => [TripStop_1.TripStop], { description: "Don't try to access the trip directly on using this" }),
    __param(0, Arg_1.Arg("location", () => utils_1.Point)),
    __param(1, Arg_1.Arg("count", { defaultValue: 100 })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [utils_1.Point, Number]),
    __metadata("design:returntype", Promise)
], TripStopResolver.prototype, "StopsByLocation", null);
TripStopResolver = __decorate([
    type_graphql_1.Resolver()
], TripStopResolver);
exports.TripStopResolver = TripStopResolver;
