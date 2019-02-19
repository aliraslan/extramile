import { Arg, Ctx, ID, Mutation, Query, Resolver } from "type-graphql";
import { Trip } from "../entity/Trip";
import { Driver } from "../entity/Driver";
import { Bus } from "../entity/Bus";
import { TripStatus } from "../utils";
import { AuthenticationError, UserInputError } from "apollo-server-express";
import { User } from "../entity/User";

@Resolver()
export class TripResolver {
  @Query(() => [Trip], { nullable: true })
  async trips(@Arg("take", { defaultValue: 100 }) take: number,
              @Arg("skip", { defaultValue: 0 }) skip: number,
              @Arg("status", () => TripStatus, { nullable: true }) status?: TripStatus
  ): Promise<Trip[]> {
    if (status)
      return await Trip.find({ take, skip, where: { status }, relations: ['passengers', 'bus', 'driver'] });
    return await Trip.find({ take, skip, relations: ['passengers', 'bus', 'driver'] });
  }

  @Mutation(() => Trip, { nullable: true })
  async createTrip(@Arg("busId", () => ID) busId: number,
                   @Arg("driverId", () => ID) driverId: number,
                   @Arg("stops") stops: string,
                   @Arg("startsAt", { description: "The time the trip starts at" }) startsAt: string
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

  @Mutation(() => Trip, { nullable: true })
  async reserveTrip(@Arg("tripId", () => ID) tripId: number,
                    @Ctx() context: any
  ): Promise<Trip | null> {
    // TODO check if this monstrosity actually works or if it's a heisenbug
    if (!context.req.session.userId) {
      throw new AuthenticationError('Must be Authenticated');
    }

    const user = await User.findOne(context.req.session.userId, { relations: ["trips"] });

    const trip = await Trip.findOne(tripId, { relations: ["bus", "passengers", "driver"] });
    if (!trip || !user) {
      throw new UserInputError("Trip does not exist!")
    }

    if (trip.passengers && trip.passengers.length && trip.bus.capacity <= trip.passengers.length) {
      throw new UserInputError("Trip is full.")
    }

    user.trips = [...(user.trips || []), trip];
    trip.passengers = [...(trip.passengers || []), user];

    await user.save();
    await trip.save();
    return trip;
  }
}
