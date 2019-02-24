import { AuthenticationError, UserInputError } from "apollo-server-express";
import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity/User";
import * as bcrypt from "bcryptjs";

// create a EditWhateverOptions that will contain all the optional arguments
// to any specific model
// Input Type lets type-graphql know that you're gonna use this in the input field
@InputType()
class EditUserOptions {
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  dateOfBirth?: string;

  @Field({ nullable: true })
  homeAddress?: string;

  @Field({ nullable: true })
  workAddress?: string;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async current(@Ctx() context: any): Promise<User | undefined> {
    if (context.req.session.userId) {
      // cookie is set try to find User
      return await User.findOne(context.req.session.userId);
    } else {
      return undefined;
    }
  }

  @Mutation(() => User, { nullable: true })
  async Login(@Arg("email") email: string,
              @Arg("password") password: string,
              @Ctx() ctx: any
  ): Promise<User | null> {
    // find user by Email
    const user = await User.findOne({ where: { email } });

    // compare password with the passed in one
    if (!user || !await bcrypt.compare(password, user.password)) {
      return null
    }
    // add the cookie to the user
    ctx.req.session.userId = user.id;
    return user;
  }

  @Mutation(() => User)
  async Register(@Arg("email") email: string,
                 @Arg("firstName") firstName: string,
                 @Arg("lastName") lastName: string,
                 @Arg("phone") phone: string,
                 @Arg("password") password: string,
                 @Ctx() ctx: any
  ): Promise<User> {
    // hash password
    const hash = await bcrypt.hash(password, 2);

    // create user with wit the passed in arguments
    const user = await User.create({
      email, firstName, password: hash, lastName, phone
    }).save();

    // set cookie
    ctx.req.session.userId = user.id;
    return user;

  }

  @Mutation(() => User)
  async EditUser(@Arg("EditUserOptions") editOptions: EditUserOptions,
                 @Ctx() ctx: any): Promise<User | undefined> {
    //split Edit user into 2 resovlers because that's much cleaner and easier to handle
    // having a single resolver that is responsible for editing everything
    // would result in a pyramid of doom of if statements checking

    // check user logged in
    if (ctx.req.session.userId) {
      // update user with editOptions
      await User.update(ctx.req.session.userId, { ...editOptions });
      // returning the user so that the new updated user could be displayed but you could change the return type from `Promise<User | undefined>` to Promise<Boolean> and return true instead
      return await User.findOne(ctx.req.session.userId);
    }
    throw new AuthenticationError("User not logged in")
  }

  @Mutation(() => User, { nullable: true })
  async ChangePassword(@Arg("oldPassword") password: string,
                       @Arg("newPasssword") newPassword: string,
                       @Ctx() ctx: any): Promise<User> {

    if (ctx.req.session.userId) {
      // get user
      const user = await User.findOne(ctx.req.session.userId);
      // check if user exists and compare the password with the old one
      if (!user || !await bcrypt.compare(password, user.password)) {
        throw new UserInputError("Invalid user id or password")
      }
      // set the user password to the hash of new password
      user.password = await bcrypt.hash(newPassword, 2);
      // return the updated user
      return await user.save();
    }
    throw new AuthenticationError("NOT LOGGED IN")
  }


}
