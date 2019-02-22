import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Driver } from "../entity/Driver";

@Resolver()
export class DriverResolver {
  @Mutation(() => Driver)
  async createDriver(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("phone") phone: string
  ): Promise<Driver> {
    return await Driver.create({ lastName, firstName, phone }).save()
  }


  @Query(() => [Driver])
  async drivers(@Arg("take", { defaultValue: 100 }) take: number,
                @Arg("skip", { defaultValue: 0 }) skip: number): Promise<Driver[]> {
    return await Driver.find({ take, skip })
  }
}
