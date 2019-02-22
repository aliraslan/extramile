import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Field, ObjectType } from "type-graphql";
import { Lazy } from "../utils";

@Entity()
@ObjectType()
export class Feedback extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @ManyToOne(() => User, (user: User) => user.tickets, { lazy: true })
  @Field(() => User)
  user: Lazy<User>;

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
