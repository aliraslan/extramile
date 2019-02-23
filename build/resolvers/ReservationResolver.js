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
const Reservation_1 = require("../entity/Reservation");
const utils_1 = require("../utils");
const User_1 = require("../entity/User");
const Trip_1 = require("../entity/Trip");
const Enums_1 = require("../Enums");
const apollo_server_express_1 = require("apollo-server-express");
const typeorm_1 = require("typeorm");
let ReservationResolver = class ReservationResolver {
    reserveTrip(tripId, pickupAddress, pickupLocation, pickupTime, dropOffAddress, dropOffLocation, dropOffTime, context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!context.req.session.userId) {
                throw new apollo_server_express_1.AuthenticationError('Must be Authenticated');
            }
            console.log(`dropOffLocation `, dropOffLocation);
            const { userId } = context.req.session;
            const userRepository = typeorm_1.getRepository(User_1.User);
            const tripRepository = typeorm_1.getRepository(Trip_1.Trip);
            const reservationRepository = typeorm_1.getRepository(Reservation_1.Reservation);
            const user = yield userRepository.findOne(userId, { relations: ["reservations"] });
            const trip = yield tripRepository.findOne(tripId, { relations: ["bus", "reservations"] });
            if (!trip || !user || trip.status !== Enums_1.TripStatus.Planned) {
                throw new apollo_server_express_1.UserInputError("Trip does not exist!");
            }
            if (trip.reservations && (yield trip.reservations).length && (yield trip.bus).numberOfSeats <= (yield trip.reservations).length) {
                throw new apollo_server_express_1.UserInputError("Trip is full.");
            }
            console.log(dropOffLocation, typeof dropOffLocation);
            const reservation = yield Reservation_1.Reservation.create({
                tripId,
                userId,
                pickupAddress,
                pickupTime,
                dropOffAddress,
                dropOffTime,
                dropOffLocation: { x: dropOffLocation.x, y: dropOffLocation.y },
                pickupLocation: { x: pickupLocation.x, y: pickupLocation.y }
            });
            (yield user.reservations).push(reservation);
            (yield trip.reservations).unshift(reservation);
            yield userRepository.save(user);
            yield tripRepository.save(trip);
            return yield reservationRepository.save(reservation);
        });
    }
    boardTrip(tripId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne(userId);
            const trip = yield Trip_1.Trip.findOne(tripId, { relations: ["reservations"] });
            if (!user)
                throw new apollo_server_express_1.UserInputError("Invalid User");
            if (!trip)
                throw new apollo_server_express_1.UserInputError("Invalid Trip");
            const [head, ...rest] = (yield trip.reservations).filter((reservation) => reservation.userId == userId && reservation.status == Enums_1.ReservationStatus.Planned);
            if (!head)
                throw new apollo_server_express_1.ApolloError("Reservation doesn't exist for this user");
            head.status = Enums_1.ReservationStatus.Boarded;
            return yield head.save();
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Reservation_1.Reservation, { nullable: true }),
    __param(0, type_graphql_1.Arg("tripId", () => type_graphql_1.ID)),
    __param(1, type_graphql_1.Arg("pickupAddress")),
    __param(2, type_graphql_1.Arg("pickupLocation", () => utils_1.Point)),
    __param(3, type_graphql_1.Arg("pickupTime")),
    __param(4, type_graphql_1.Arg("dropOffAddress")),
    __param(5, type_graphql_1.Arg("dropOffLocation", () => utils_1.Point)),
    __param(6, type_graphql_1.Arg("dropOffTime")),
    __param(7, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, utils_1.Point, String, String, utils_1.Point, String, Object]),
    __metadata("design:returntype", Promise)
], ReservationResolver.prototype, "reserveTrip", null);
__decorate([
    type_graphql_1.Mutation(() => Reservation_1.Reservation, { nullable: true }),
    __param(0, type_graphql_1.Arg("tripId", () => type_graphql_1.ID)),
    __param(1, type_graphql_1.Arg("userId", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ReservationResolver.prototype, "boardTrip", null);
ReservationResolver = __decorate([
    type_graphql_1.Resolver()
], ReservationResolver);
exports.ReservationResolver = ReservationResolver;
