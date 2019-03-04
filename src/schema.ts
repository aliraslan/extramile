import { buildSchema } from "type-graphql";
import {
  BusResolver,
  ConnectionResolver,
  DriverResolver,
  FeedbackResolver,
  ReservationResolver,
  TripResolver,
  TripStopResolver,
  UserResolver,
  LineResolver
} from "./resolvers";

export const schema = buildSchema({
  resolvers: [
    TripStopResolver,
    ConnectionResolver,
    UserResolver,
    TripResolver,
    FeedbackResolver,
    BusResolver,
    DriverResolver,
    ReservationResolver,
    LineResolver
  ]
});
