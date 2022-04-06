import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ObjectID } from "typeorm";
import { RecList } from "../entity/RecList";
import { User } from "../entity/User";
import { isAuth } from "../authorization/isAuth";

@Resolver()
export class RecListResolver {
  @Mutation(() => Boolean)
  async createRecList(
    @Arg("authorization") autherization: string,
    @Arg("title") title: string
  ) {
    const { userId } = isAuth(autherization);
    const user = await User.findOne(userId);
    await RecList.create({
      title,
      createdBy: user,
      recommendations: [],
    }).save();
    return true;
  }

  @Query(() => [RecList])
  async recList(): Promise<RecList[]> {
    const recList = await RecList.find();
    return recList;
  }

  @Mutation(() => Boolean)
  async deleteRecList(
    @Arg("authorization") authorization: string,
    @Arg("recListId") recListId: string
  ) {
    const { userId } = isAuth(authorization);
    const recList = await RecList.findOne(recListId as unknown as ObjectID);
    if (!recList)
      throw new Error(`Cannot find recList with ID '${recListId}'.`);
    const { createdBy } = recList;
    // You should not be allowed to delete another user's recommendation list.
    if (createdBy.id != userId) throw new Error("Access denied.");
    await recList.remove();
    return true;
  }
}
