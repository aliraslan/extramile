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
      // check user logged in
      throw new AuthenticationError('Must be Authenticated');
    }

    // get userID from cookie
    const { userId }: { userId: string } = context.req.session;
    // using repos instead of the Entity model because of a bug in typeorm
    // https://github.com/typeorm/typeorm/issues/3576 and https://github.com/typeorm/typeorm/issues/3689
    // repos are functionally equivalent but repos are more powerful and not affected by the bug
    const userRepository = getRepository(User);
    const tripRepository = getRepository(Trip);
    const reservationRepository = getRepository(Reservation);

    // get user and preloading reservations
    const user = await userRepository.findOne(userId, { relations: ["reservations"] });
    // get trip preloaded with bus and reservations
    const trip = await tripRepository.findOne(tripId, { relations: ["bus", "reservations"] });
    // check if both the user and trip exist and that the trip is not started/cancelled/completed
    if (!trip || !user || trip.status !== TripStatus.Planned) {
      throw new UserInputError("Trip does not exist!")
    }
    // check if there is any reservation. and check if the number of seats less or equal reservations
    if (trip.reservations && (await trip.reservations).length && (await trip.bus).numberOfSeats <= (await trip.reservations).length) {
      throw new UserInputError("Trip is full.")
    }

    // create new reservation
    const reservation = await Reservation.create({
      tripId,
      userId,
      pickupAddress,
      pickupTime,
      dropOffAddress,
      dropOffTime,     // check if this is still needed.
      dropOffLocation: { x: dropOffLocation.x, y: dropOffLocation.y },
      pickupLocation: { x: pickupLocation.x, y: pickupLocation.y }
    });

    // push the new reservation unto the user.reservation
    (await user.reservations).push(reservation);
    //
    (await trip.reservations).unshift(reservation);
    // save user and trip
    await userRepository.save(user);
    await tripRepository.save(trip);
    // return the newly saved reservation
    return await reservationRepository.save(reservation);

  }

  @Mutation(() => Reservation, { nullable: true })
  async boardTrip(@Arg("tripId", () => ID) tripId: string,
                  @Arg("userId", () => ID) userId: string): Promise<Reservation> {
    // get user and trip
    const user = await User.findOne(userId);
    const trip = await Trip.findOne(tripId, { relations: ["reservations"] });

    // check that they exist
    if (!user)
      throw new UserInputError("Invalid User");

    if (!trip)
      throw new UserInputError("Invalid Trip");

    // @ts-ignore noinspection JSUnusedLocalSymbols
    // filter all reservations and get the first one that is planned
    // i'm doing it this way so that a user can board multiple times using multiple reservations
    const [head, ...rest] = (await trip.reservations).filter((reservation: Reservation) =>
      // get all reservations that are planned by user
      reservation.userId == userId && reservation.status == ReservationStatus.Planned
    );

    // check if reservation exists
    if (!head)
      throw new ApolloError("Reservation doesn't exist for this user");
    // set the status of the first reservation to boarded
    head.status = ReservationStatus.Boarded;
    // return the newly saved reservation
    return await head.save()
  }

}
