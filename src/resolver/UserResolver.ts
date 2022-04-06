import * as bcrypt from "bcryptjs";
import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { ObjectID } from "typeorm";
import { User } from "../entity/User";
import { isAuth } from "../authorization/isAuth";
import { LoginInput } from "./inputType/user/LoginInput";
import { RegisterInput } from "./inputType/user/RegisterInput";
import { createAccessToken } from "../authorization/accessToken";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {
  // Do not remove! TypeGraphQL will complain if there are no queries.
  @Query(() => String)
  async hello() {
    return "Hello world!";
  }

  @Query(() => String)
  userId(@Arg("authorization") authorization: string): ObjectID {
    const { userId } = isAuth(authorization);
    return userId;
  }

  @Mutation(() => User)
  async register(
    @Arg("registerInput") registerInput: RegisterInput
  ): Promise<User> {
    const { password, ...userinfo } = registerInput;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = User.create({ password: hashedPassword, ...userinfo }).save();
    return user;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("loginInput") loginInput: LoginInput
  ): Promise<LoginResponse> {
    const { email, password } = loginInput;
    const user = await User.findOne({ email });
    let accessToken = "";
    if (user) {
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        accessToken = createAccessToken(user);
      }
    }
    return { accessToken };
  }
}
