import { Arg, Ctx, ID, Mutation, Resolver } from "type-graphql";
import { Reservation } from "../entity/Reservation";
import { Point } from "../utils";
import { User } from "../entity/User";
import { Trip } from "../entity/Trip";
import { ReservationStatus, TripStatus } from "../Enums";
import { ApolloError, AuthenticationError, UserInputError } from 'apollo-server-express';


@Resolver()
export class ReservationResolver {
  @Mutation(() => Reservation, { nullable: true })
  async reserveTrip(@Arg("tripId", () => ID) tripId: string,
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

  @Mutation(() => Reservation, { nullable: true })
  async boardTrip(@Arg("tripId", () => ID) tripId: string,
                  @Arg("userId", () => ID) userId: string): Promise<Reservation> {
    const user = await User.findOne(userId);
    const trip = await Trip.findOne(tripId, { relations: ["reservations"] });

    if (!user)
      throw new UserInputError("Invalid User");

    if (!trip)
      throw new UserInputError("Invalid Trip");

    // @ts-ignore // get the first planned reservation.
    const [head, ...rest] = trip.reservations.filter((reservation: Reservation) =>
      // get all reservations that are planned by user
      reservation.userId == userId && reservation.status == ReservationStatus.Planned
    );

    // check if reservation exists
    if (!head)
      throw new ApolloError("Reservation doesn't exist for this user");

    head.status = ReservationStatus.Boarded;
    return await head.save()
  }

}
