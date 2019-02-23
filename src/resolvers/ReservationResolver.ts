import { Arg, Ctx, ID, Mutation, Resolver } from "type-graphql";
import { Reservation } from "../entity/Reservation";
import { Point } from "../utils";
import { User } from "../entity/User";
import { Trip } from "../entity/Trip";
import { ReservationStatus, TripStatus } from "../Enums";
import { ApolloError, AuthenticationError, UserInputError } from 'apollo-server-express';
import { getRepository } from "typeorm";


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
  ): Promise<Reservation | undefined> {
    if (!context.req.session.userId) {
      throw new AuthenticationError('Must be Authenticated');
    }

    console.log(`dropOffLocation `, dropOffLocation);
    const { userId }: { userId: string } = context.req.session;
    const userRepository = getRepository(User);
    const tripRepository = getRepository(Trip);
    const reservationRepository = getRepository(Reservation);

    const user = await userRepository.findOne(userId, { relations: ["reservations"] });

    const trip = await tripRepository.findOne(tripId, { relations: ["bus", "reservations"] });

    if (!trip || !user || trip.status !== TripStatus.Planned) {
      throw new UserInputError("Trip does not exist!")
    }

    if (trip.reservations && (await trip.reservations).length && (await trip.bus).numberOfSeats <= (await trip.reservations).length) {
      throw new UserInputError("Trip is full.")
    }

    console.log(dropOffLocation, typeof dropOffLocation);

    const reservation = await Reservation.create({
      tripId,
      userId,
      pickupAddress,
      pickupTime,
      dropOffAddress,
      dropOffTime,
      dropOffLocation: { x: dropOffLocation.x, y: dropOffLocation.y },
      pickupLocation: { x: pickupLocation.x, y: pickupLocation.y }
    });

    (await user.reservations).push(reservation);
    (await trip.reservations).unshift(reservation);

    await userRepository.save(user);
    await tripRepository.save(trip);

    return await reservationRepository.save(reservation);

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
    // noinspection JSUnusedLocalSymbols
    const [head, ...rest] = (await trip.reservations).filter((reservation: Reservation) =>
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
