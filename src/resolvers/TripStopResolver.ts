import { Query, Resolver } from "type-graphql";
import { Mutation } from "type-graphql/decorators/Mutation";
import { TripStop } from "../entity/TripStop";
import { Arg } from "type-graphql/decorators/Arg";
import { Point } from "../utils";
import { Trip } from "../entity/Trip";
import { TripStatus } from "../Enums";
import { LessThan } from "typeorm";
import * as moment from "moment";
import * as geokdbush from "geokdbush";
import * as kdbush from "kdbush";

@Resolver()
export class TripStopResolver {
  @Mutation(() => TripStop)
  async createStop(
    @Arg("location", () => Point) location: Point,
    @Arg("address") address: string
  ): Promise<TripStop> {
    return await TripStop.create({ location, address }).save()
  }

  @Query(() => [TripStop], { description: "Don't try to access the trip directly on using this" })
  async StopsByLocation(@Arg("location", () => Point) location: Point,
                        @Arg("count", { defaultValue: 100 }) count: number) {
    // find all planned trips in the next 2 days
    const trips = await Trip.find({
      where: {
        status: TripStatus.Planned,
        startedAt: LessThan(moment().add(2, "days"))
      },
      relations: ["stops"]
    });
    // get a list of all the stops
    const stops = (await Promise.all(trips.map(({ stops }) => stops))).flat();
    // @ts-ignore
    const index = new kdbush(
      stops,
      (s) => s.location.x,
      (s) => s.location.y
    );
    // perform nearest neighbour search
    return geokdbush.around(index, location.x, location.y, count);
  }
}