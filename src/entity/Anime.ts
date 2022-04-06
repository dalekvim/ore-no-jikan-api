import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToMany, ObjectID, ObjectIdColumn } from "typeorm";
import { RecList } from "./RecList";

@ObjectType()
@Entity()
export class Anime {
  @Field(() => Int)
  @ObjectIdColumn()
  id: ObjectID;

  @Field(() => Int)
  @Column({ unique: true })
  malId: number;

  @Field()
  @Column()
  img: string;

  @Field(() => [RecList])
  @ManyToMany(() => RecList)
  @Column({ default: [] })
  recLists: RecList[];
}
