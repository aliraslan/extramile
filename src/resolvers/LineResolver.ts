import { Resolver, Arg, Mutation, ID } from "type-graphql";
import { Line } from "../entity/Line";
import { TripStop } from "../entity/TripStop";
import { UserInputError } from "apollo-server-core";
import { getRepository } from "typeorm";

@Resolver()
export class LineResolver {
  @Mutation(() => Line, {
    nullable: true,
    description: "creates an empty line."
  })
  async createLine(
    @Arg("name") name: string,
    @Arg("busId", () => ID) busId: number,
    @Arg("driverId", () => ID) driverId: string
  ): Promise<Line | null> {
    return await Line.create({
      name,
      busId,
      driverId
    }).save();
  }

  @Mutation(() => Line)
  async buildLine(
    @Arg("stops", () => [String], { description: "Array of TripStop IDs" })
    stopIds: string[],
    @Arg("lineId") lineId: string
  ): Promise<Line | null> {
    const stops = await TripStop.findByIds(stopIds);
    const line = await Line.findOne(lineId);

    if (!line) throw new UserInputError("Invalid Line ID");

    for (let stop of stops) {
      stop.lineId = lineId;
    }

    getRepository(TripStop).save(stops);
    return line;
  }
}
