import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Bus } from "../entity/Bus";
import { BusType } from "../Enums";

@Resolver()
export class BusResolver {
  @Mutation(() => Bus)
  async createBus(
    @Arg("busType", () => BusType) type: BusType,
    @Arg("model") model: string,
    @Arg("numberOfSeats", () => Int) numberOfSeats: number,
    @Arg("capacity") capacity: number,
    @Arg("licensePlate") licensePlate: string,
    @Arg("make") make: string,
  ): Promise<Bus | null> {
    return await Bus.create({ type, model, numberOfSeats, capacity, licensePlate, make }).save()
  }


  @Query(() => [Bus])
  async bus(@Arg("take", { defaultValue: 100 }) take: number,
            @Arg("skip", { defaultValue: 0 }) skip: number): Promise<Bus[]> {
    return await Bus.find({ take, skip })
  }
}
