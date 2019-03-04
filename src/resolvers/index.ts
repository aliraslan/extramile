import { BusResolver } from "./BusResolver";
import { DriverResolver } from "./DriverResolver";
import { UserResolver } from "./UserResolver";
import { TripResolver } from "./TripResolver";
import { FeedbackResolver } from "./FeedbackResolver";
import { ReservationResolver } from "./ReservationResolver";
import { TripStopResolver } from "./TripStopResolver";
import { LineResolver } from "./LineResolver";
import { Query, Resolver } from "type-graphql";

@Resolver()
class ConnectionResolver {
  @Query(() => String)
  async Connection() {
    return "Connected!";
  }
}

export {
  ConnectionResolver,
  UserResolver,
  TripResolver,
  FeedbackResolver,
  BusResolver,
  TripStopResolver,
  DriverResolver,
  ReservationResolver,
  LineResolver
};
