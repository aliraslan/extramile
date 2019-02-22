import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity/User";
import * as bcrypt from "bcryptjs";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async current(@Ctx() context: any): Promise<User | undefined> {
    if (context.req.session.userId) {
      const user = await User.findOne(context.req.session.userId, {
        relations: ["reservations", "tickets"]
      });
      console.log(user);
      return user;
    } else {
      return undefined;
    }
  }

  @Mutation(() => User, { nullable: true })
  async Login(@Arg("email") email: string,
              @Arg("password") password: string,
              @Ctx() ctx: any
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });

    if (!user || !await bcrypt.compare(password, user.password)) {
      return null
    }

    ctx.req.session.userId = user.id;
    return user;
  }

  @Mutation(() => User)
  async Register(@Arg("email") email: string,
                 @Arg("firstName") firstName: string,
                 @Arg("lastName") lastName: string,
                 @Arg("phone") phone: string,
                 @Arg("password") password: string,
  ): Promise<User> {
    // const hash = await argon2.hash(password);
    const hash = await bcrypt.hash(password, 2);
    return await User.create({
      email, firstName, password: hash, lastName, phone
    }).save()
  }
}
