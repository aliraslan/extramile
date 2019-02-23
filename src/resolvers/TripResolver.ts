import { Arg, ID, Mutation, PubSub, PubSubEngine, Query, Resolver, Root, Subscription } from "type-graphql";
import { ApolloError, UserInputError } from "apollo-server-express";
import { Trip } from "../entity/Trip";
import { Driver } from "../entity/Driver";
import { TripStatus } from "../Enums";
import * as moment from "moment";
import { LocationPayload, Point, TripLocation } from "../utils";
import { TripStop } from "../entity/TripStop";
import { getRepository } from "typeorm";

@Resolver()
export class TripResolver {
  ids: string[];
  private autoIncrement = 0;

  @Query(() => [Trip], { nullable: true })
  async trips(
    @Arg("take", { defaultValue: 100 }) take: number,
    @Arg("skip", { defaultValue: 0 }) skip: number,
    @Arg("status", () => TripStatus, { nullable: true }) status?: TripStatus,
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

  @Mutation(() => Trip, { nullable: true, description: "creates a trip without the stops." })
  async createTrip(
    @Arg("busId", () => ID) busId: number,
    @Arg("driverId", () => ID) driverId: string,
    @Arg("startsAt", { description: "The time the trip starts at" })
      startsAt: string
  ): Promise<Trip | null> {
    return await Trip.create({
      startedAt: startsAt,
      busId,
      driverId,
    }).save();
  }

  @Mutation(() => Boolean)
  async setStops(
    @Arg("stops", () => [String], { description: "array of TripStop ids" }) ids: string[],
    @Arg("tripId") tripId: string
  ): Promise<Boolean> {
    const stops = await TripStop.findByIds(ids);
    const trip = await Trip.findOne(tripId);

    if (!trip)
      throw new UserInputError("Invalid Trip ID");

    for (let stop of stops) {
      stop.tripId = tripId;
    }

    getRepository(TripStop).save(stops);
    return true;
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

  @Subscription({ topics: ({ args }) => args.tripId })
  TripLocation(
    // @ts-ignore
    @Arg("tripId") tripId: string,
    @Root() { id, location }: LocationPayload,
  ): TripLocation {
    return { id, location, date: new Date() };
  }

  @Mutation(() => Boolean, { description: "returns true if location was received by the server" })
  async UpdateTripLocation(@Arg("tripId") tripId: string,
                           @Arg("location", () => Point) location: Point,
                           @PubSub() pubSub: PubSubEngine,
  ): Promise<Boolean> {
    const payload: LocationPayload = { id: ++this.autoIncrement, location };
    await pubSub.publish(tripId, payload);
    return true;
  }
}
