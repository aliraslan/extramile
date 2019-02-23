"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
var TripStatus;
(function (TripStatus) {
    TripStatus["Planned"] = "planned";
    TripStatus["Started"] = "started";
    TripStatus["Completed"] = "completed";
    TripStatus["Cancelled"] = "cancelled";
})(TripStatus = exports.TripStatus || (exports.TripStatus = {}));
type_graphql_1.registerEnumType(TripStatus, { name: "tripStatus" });
var BusType;
(function (BusType) {
    BusType["mini"] = "mini";
    BusType["micro"] = "micro";
    BusType["midi"] = "midi";
    BusType["coach"] = "coach";
})(BusType = exports.BusType || (exports.BusType = {}));
type_graphql_1.registerEnumType(BusType, { name: "busType" });
var ReservationStatus;
(function (ReservationStatus) {
    ReservationStatus["Cancelled"] = "cancelled";
    ReservationStatus["Missed"] = "missed";
    ReservationStatus["Planned"] = "planned";
    ReservationStatus["Boarded"] = "boarded";
})(ReservationStatus = exports.ReservationStatus || (exports.ReservationStatus = {}));
type_graphql_1.registerEnumType(ReservationStatus, { name: "reservationStatus" });
