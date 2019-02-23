import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { ApolloError, UserInputError } from "apollo-server-express";
import { Trip } from "../entity/Trip";
import { Driver } from "../entity/Driver";
import { Bus } from "../entity/Bus";
import { TripStatus } from "../Enums";
import * as moment from "moment";
import { Point } from "../utils";

@Resolver()
export class TripResolver {
  @Query(() => [Trip], { nullable: true })
  async trips(
    @Arg("take", { defaultValue: 100 }) take: number,
    @Arg("skip", { defaultValue: 0 }) skip: number,
    @Arg("status", () => TripStatus, { nullable: true }) status?: TripStatus
  ): Promise<Trip[]> {
    if (status)
      return await Trip.find({
        take,
        skip,
        where: { status },
      });
    return await Trip.find({
      take,
      skip,
    });
  }

  @Mutation(() => Trip, { nullable: true })
  async createTrip(
    @Arg("busId", () => ID) busId: number,
    @Arg("driverId", () => ID) driverId: number,
    @Arg("stops") stops: string,
    @Arg("startsAt", { description: "The time the trip starts at" })
      startsAt: string
  ): Promise<Trip | null> {
    const bus = await Bus.findOne(busId);
    const driver = await Driver.findOne(driverId);

    return await Trip.create({
      startedAt: startsAt,
      bus,
      driver,
      stops
    }).save();
  }

  @Mutation(() => Trip)
  async StartTrip(
    @Arg("driverId") driverId: string,
    @Arg("tripId") tripId: string
  ): Promise<Trip> {
    const trip = await Trip.findOne(tripId, { relations: ["driver"] });
    const driver = await Driver.findOne(driverId);
    if (!trip) {
      throw new UserInputError("Invalid Trip. trip doesn't exist");
    }

    if (!driver) {
      throw new UserInputError("Invalid Driver, driver doesn't exist");
    }

    if ((await trip.driver).id != driverId) {
      throw new UserInputError(
        "Invalid Driver for trip, driver id and trip driver id mismatch"
      );
    }

    if (trip.status != TripStatus.Planned) {
      throw new ApolloError(`The trip couldn't be started because it was ${trip.status}`);
    }

    const startsAt = moment(trip.startedAt);
    const now = moment();

    const tripWindowOpenTime = startsAt.clone().subtract(10, "minutes");
    const tripWindowCloseTime = startsAt.clone().add(10, "minutes");

    if (now < tripWindowOpenTime) {
      throw new UserInputError(
        `Incorrect time. the 10 min window opens ${tripWindowOpenTime.fromNow()}`
      );
    }

    if (now > tripWindowCloseTime) {
      throw new UserInputError(
        `Incorrect time. the 10 minute window closed ${tripWindowCloseTime.fromNow()}`
      );
    }

    trip.status = TripStatus.Started;
    return await trip.save();
  }
}
