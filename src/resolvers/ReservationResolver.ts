import { Arg, Ctx, ID, Mutation, Resolver } from "type-graphql";
import { Reservation } from "../entity/Reservation";
import { Point } from "../utils";
import { User } from "../entity/User";
import { Trip } from "../entity/Trip";
import { TripStatus } from "../Enums";
import { AuthenticationError, UserInputError } from 'apollo-server-express';


@Resolver()
export class ReservationResolver {
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

    const user = await User.findOne(context.req.session.userId, { relations: ["reservations"] });

    const trip = await Trip.findOne(tripId, { relations: ["bus", "reservations"] });
    if (!trip || !user || trip.status !== TripStatus.Planned) {
      throw new UserInputError("Trip does not exist!")
    }

    if (trip.reservations && trip.reservations.length && trip.bus.numberOfSeats <= trip.reservations.length) {
      throw new UserInputError("Trip is full.")
    }
    console.log(dropOffLocation, typeof dropOffLocation);

    let reservation = await Reservation.create({
      trip,
      user,
      pickupAddress,
      pickupTime,
      dropOffAddress,
      dropOffTime,
      dropOffLocation,
      pickupLocation
    });

    user.reservations.push(reservation);
    trip.reservations.unshift(reservation);

    await user.save();
    await trip.save();
    return await reservation.save();
  }
}
