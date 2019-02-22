import { Arg, Ctx, ID, Mutation, Query, Resolver } from "type-graphql";
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { Trip } from "../entity/Trip";
import { Driver } from "../entity/Driver";
import { Bus } from "../entity/Bus";
import { TripStatus } from "../Enums";
import { Reservation } from "../entity/Reservation";
import { User } from "../entity/User";
import { Point } from "../utils";

@Resolver()
export class TripResolver {
  @Query(() => [Trip], { nullable: true })
  async trips(@Arg("take", { defaultValue: 100 }) take: number,
              @Arg("skip", { defaultValue: 0 }) skip: number,
              @Arg("status", () => TripStatus, { nullable: true }) status?: TripStatus
  ): Promise<Trip[]> {
    if (status)
      return await Trip.find({ take, skip, where: { status }, relations: ['reservations', 'bus', 'driver'] });
    return await Trip.find({ take, skip, relations: ['reservations', 'bus', 'driver'] });
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

  @Mutation(() => Reservation, { nullable: true })
  async reserveTrip(@Arg("tripId", () => ID) tripId: number,
                    @Arg("pickupAddress") pickupAddress: string,
                    @Arg("pickupLocation", () => Point) pickupLocation: Point,
                    @Arg("pickupTime") pickupTime: string,
                    @Arg("dropOffAddress") dropOffAddress: string,
                    @Arg("dropOffLocation", () => Point) dropOffLocation: Point,
                    @Arg("dropOffTime") dropOffTime: string,
                    @Ctx() context: any
  ): Promise<Reservation | null> {
    // TODO check if this monstrosity actually works or if it's a heisenbug
    if (!context.req.session.userId) {
      throw new AuthenticationError('Must be Authenticated');
    }

    const user = await User.findOne(context.req.session.userId, { relations: ["reservation"] });

    const trip = await Trip.findOne(tripId, { relations: ["bus", "reservation"] });
    if (!trip || !user || trip.status !== TripStatus.Planned) {
      throw new UserInputError("Trip does not exist!")
    }

    if (trip.reservations && trip.reservations.length && trip.bus.numberOfSeats <= trip.reservations.length) {
      throw new UserInputError("Trip is full.")
    }

    let reservation = await Reservation.create({
      trip, user, pickupAddress, pickupTime, dropOffAddress, dropOffTime, dropOffLocation, pickupLocation
    });

    user.reservations.push(reservation);
    trip.reservations.unshift(reservation);

    await user.save();
    await trip.save();
    return reservation;
  }
}
