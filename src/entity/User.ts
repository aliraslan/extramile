import { Column, Entity, OneToMany } from "typeorm";
import { Point } from "../utils";
import { Feedback } from "./Feedback";
import { Account } from "./Account";
import { Reservation } from "./Reservation";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType({ implements: Account })
export class User extends Account {
  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  password: string;

  @Column({ length: 256, nullable: true })
  @Field({ nullable: true })
  workAddress?: string;

  @Column("point", { nullable: true })
  @Field(() => Point, { nullable: true })
  workLocation?: Point;

  @OneToMany(() => Reservation, (reservation: Reservation) => reservation.user)
  @Field(() => [Reservation])
  reservations: Reservation[];

  @OneToMany(() => Feedback, (ticket: Feedback) => ticket.user)
  @Field(() => [Feedback])
  tickets: Feedback[];
}
