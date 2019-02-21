import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { Point } from "../utils";
import { Feedback } from "./Feedback";
import { Account } from "./Account";
import { Reservation } from "./Reservation";

@Entity()
export class User extends Account {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ length: 256, nullable: true })
  workAddress?: string;

  @Column("point", { nullable: true })
  workLocation?: Point;

  @ManyToMany(() => Reservation, (reservation: Reservation) => reservation.user)
  reservations: Reservation[];

  @OneToMany(() => Feedback, (ticket: Feedback) => ticket.user)
  tickets: Feedback[];
}
