import { Field, InputType } from "type-graphql";
import { LoginInput } from "./LoginInput";

@InputType()
export class RegisterInput extends LoginInput {
  @Field()
  username: string;
}
