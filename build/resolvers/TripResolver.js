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
const apollo_server_express_1 = require("apollo-server-express");
const Trip_1 = require("../entity/Trip");
const Driver_1 = require("../entity/Driver");
const Enums_1 = require("../Enums");
const moment = require("moment");
const utils_1 = require("../utils");
const TripStop_1 = require("../entity/TripStop");
const typeorm_1 = require("typeorm");
let TripResolver = class TripResolver {
    constructor() {
        this.autoIncrement = 0;
    }
    trips(take, skip, status) {
        return __awaiter(this, void 0, void 0, function* () {
            if (status)
                return yield Trip_1.Trip.find({
                    take,
                    skip,
                    where: { status },
                });
            return yield Trip_1.Trip.find({
                take,
                skip,
            });
        });
    }
    createTrip(busId, driverId, startsAt) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Trip_1.Trip.create({
                startedAt: startsAt,
                busId,
                driverId,
            }).save();
        });
    }
    setStops(ids, tripId) {
        return __awaiter(this, void 0, void 0, function* () {
            const stops = yield TripStop_1.TripStop.findByIds(ids);
            const trip = yield Trip_1.Trip.findOne(tripId);
            if (!trip)
                throw new apollo_server_express_1.UserInputError("Invalid Trip ID");
            for (let stop of stops) {
                stop.tripId = tripId;
            }
            typeorm_1.getRepository(TripStop_1.TripStop).save(stops);
            return true;
        });
    }
    StartTrip(driverId, tripId) {
        return __awaiter(this, void 0, void 0, function* () {
            const trip = yield Trip_1.Trip.findOne(tripId, { relations: ["driver"] });
            const driver = yield Driver_1.Driver.findOne(driverId);
            if (!trip) {
                throw new apollo_server_express_1.UserInputError("Invalid Trip. trip doesn't exist");
            }
            if (!driver) {
                throw new apollo_server_express_1.UserInputError("Invalid Driver, driver doesn't exist");
            }
            if ((yield trip.driver).id != driverId) {
                throw new apollo_server_express_1.UserInputError("Invalid Driver for trip, driver id and trip driver id mismatch");
            }
            if (trip.status != Enums_1.TripStatus.Planned) {
                throw new apollo_server_express_1.ApolloError(`The trip couldn't be started because it was ${trip.status}`);
            }
            const startsAt = moment(trip.startedAt);
            const now = moment();
            const tripWindowOpenTime = startsAt.clone().subtract(10, "minutes");
            const tripWindowCloseTime = startsAt.clone().add(10, "minutes");
            if (now < tripWindowOpenTime) {
                throw new apollo_server_express_1.UserInputError(`Incorrect time. the 10 min window opens ${tripWindowOpenTime.fromNow()}`);
            }
            if (now > tripWindowCloseTime) {
                throw new apollo_server_express_1.UserInputError(`Incorrect time. the 10 minute window closed ${tripWindowCloseTime.fromNow()}`);
            }
            trip.status = Enums_1.TripStatus.Started;
            return yield trip.save();
        });
    }
    TripLocation(tripId, { id, location }) {
        return { id, location, date: new Date() };
    }
    UpdateTripLocation(tripId, location, pubSub) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = { id: ++this.autoIncrement, location };
            yield pubSub.publish(tripId, payload);
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Trip_1.Trip], { nullable: true }),
    __param(0, type_graphql_1.Arg("take", { defaultValue: 100 })),
    __param(1, type_graphql_1.Arg("skip", { defaultValue: 0 })),
    __param(2, type_graphql_1.Arg("status", () => Enums_1.TripStatus, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], TripResolver.prototype, "trips", null);
__decorate([
    type_graphql_1.Mutation(() => Trip_1.Trip, { nullable: true, description: "creates a trip without the stops." }),
    __param(0, type_graphql_1.Arg("busId", () => type_graphql_1.ID)),
    __param(1, type_graphql_1.Arg("driverId", () => type_graphql_1.ID)),
    __param(2, type_graphql_1.Arg("startsAt", { description: "The time the trip starts at" })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], TripResolver.prototype, "createTrip", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("stops", () => [String], { description: "array of TripStop ids" })),
    __param(1, type_graphql_1.Arg("tripId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], TripResolver.prototype, "setStops", null);
__decorate([
    type_graphql_1.Mutation(() => Trip_1.Trip),
    __param(0, type_graphql_1.Arg("driverId")),
    __param(1, type_graphql_1.Arg("tripId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TripResolver.prototype, "StartTrip", null);
__decorate([
    type_graphql_1.Subscription({ topics: ({ args }) => args.tripId }),
    __param(0, type_graphql_1.Arg("tripId")),
    __param(1, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", utils_1.TripLocation)
], TripResolver.prototype, "TripLocation", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean, { description: "returns true if location was received by the server" }),
    __param(0, type_graphql_1.Arg("tripId")),
    __param(1, type_graphql_1.Arg("location", () => utils_1.Point)),
    __param(2, type_graphql_1.PubSub()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, utils_1.Point, Object]),
    __metadata("design:returntype", Promise)
], TripResolver.prototype, "UpdateTripLocation", null);
TripResolver = __decorate([
    type_graphql_1.Resolver()
], TripResolver);
exports.TripResolver = TripResolver;
