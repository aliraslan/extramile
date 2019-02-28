import { Column, Entity, OneToMany } from "typeorm";
import { Lazy, Point } from "../utils";
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
  @Field()
  password: string;

  @Column({ length: 256, nullable: true })
  @Field({ nullable: true })
  workAddress?: string;

  @Column({
    type: "point",
    nullable: true,
    transformer: {
      from: p => p,
      to: p => p ? `${p.x},${p.y}` : null
    }
  })
  @Field(() => Point, { nullable: true })
  workLocation?: Point;

  @OneToMany(() => Reservation, (reservation: Reservation) => reservation.user, { lazy: true })
  @Field(() => [Reservation])
  reservations: Lazy<Reservation[]>;

  @OneToMany(() => Feedback, (ticket: Feedback) => ticket.user, { lazy: true })
  @Field(() => [Feedback])
  tickets: Lazy<Feedback[]>;
}
