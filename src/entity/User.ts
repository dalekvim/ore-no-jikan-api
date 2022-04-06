import { IsEmail, Length } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  OneToMany,
} from "typeorm";
import { RecList } from "./RecList";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID;

  @Field()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Field()
  @Length(1, 255)
  @Column()
  username: string;

  // Do not expose the user's password!
  @Column()
  password: string;

  @Field(() => [RecList])
  @OneToMany(() => RecList, (recList) => recList.createdBy)
  recList: RecList[];
}
