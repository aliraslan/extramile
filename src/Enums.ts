import { registerEnumType } from "type-graphql";

export enum TripStatus {
  Planned = "planned", // sue me. it was either unstarted or unbegun
  Started = "started",
  Completed = "completed",
  Cancelled = "cancelled",
}

registerEnumType(TripStatus, { name: "tripStatus" });

export enum BusType {
  mini = "mini",
  micro = "micro",
  midi = "midi",
  coach = "coach"
}

registerEnumType(BusType, { name: "busType" });

export enum ReservationStatus {
  Cancelled = "cancelled",
  Missed = "missed",
  Planned = "planned",
  Boarded = "boarded"
}

registerEnumType(ReservationStatus, { name: "reservationStatus" });