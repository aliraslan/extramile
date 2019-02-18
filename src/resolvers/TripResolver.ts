import { Resolver } from "type-graphql/decorators/Resolver";
import { Arg, ID, Mutation, Query } from "type-graphql";
import { Trip } from "../entity/Trip";
import { Driver } from "../entity/Driver";
import { Bus } from "../entity/Bus";
import { Point, TripStatus } from "../utils";

@Resolver()
export class TripResolver {
  @Query(() => [Trip], { nullable: true })
  async trips(@Arg("take", { defaultValue: 100 }) take: number,
              @Arg("skip", { defaultValue: 0 }) skip: number,
              @Arg("status", () => TripStatus) status: TripStatus
  ): Promise<Trip[]> {
    return await Trip.find({ take, skip, where: { status } });
  }

  @Mutation(() => Trip, { nullable: true })
  async createTrip(@Arg("busId", () => ID) busId: number,
                   @Arg("driverId", () => ID) driverId: number,
                   @Arg("stops", () => [Point]) stops: Point[],
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
}
