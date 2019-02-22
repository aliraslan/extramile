import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Feedback extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @ManyToOne(() => User, (user: User) => user.tickets)
  @Field(() => User)
  user: User;

  @Column()
  @Field()
  message: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  @Field()
  createdAt: string;

  @Column({ default: true })
  @Field(() => Boolean)
  active: boolean;
}
