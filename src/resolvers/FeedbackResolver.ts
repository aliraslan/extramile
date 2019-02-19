import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../entity/User";
import { Feedback } from "../entity/Feedback";

@Resolver()
export class FeedbackResolver {
  @Mutation(() => Boolean)
  async SubmitFeedback(
    @Arg("message") message: string,
    @Ctx() context: any
  ): Promise<boolean> {
    if (context.req.session.userId) {
      await Feedback.create({
        message,
        user: await User.findOne(context.req.session.userId)
      }).save();
      return true;
    }
    return false;
  }
}
