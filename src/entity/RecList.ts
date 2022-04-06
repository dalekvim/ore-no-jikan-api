import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  ObjectID,
  ObjectIdColumn,
} from "typeorm";
import { Anime } from "./Anime";
// import { Anime } from "./Anime";
import { User } from "./User";

@ObjectType()
@Entity()
export class RecList extends BaseEntity {
  @Field(() => String)
  @ObjectIdColumn()
  id: ObjectID;

  @Field()
  @Column()
  title: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.recList, { onDelete: "CASCADE" })
  @Column()
  createdBy: User;

  @Field(() => [Anime])
  @ManyToMany(() => Anime)
  @Column()
  recommendations: Anime[];
}
