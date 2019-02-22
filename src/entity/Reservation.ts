import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Trip } from "./Trip";
import { ReservationStatus } from "../Enums";
import { Lazy, Point } from "../utils";
import { Field, ObjectType } from "type-graphql";

// Sorry Beshoi.

@Entity()
@ObjectType()
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  @Field()
  createdAt: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  @Field()
  pickupTime: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: true })
  @Field({ nullable: true })
  dropOffTime?: string;

  @Column()
  @Field()
  pickupAddress: string;

  @Column("point", {
    transformer: {
      from: (p: Point) => p,
      to: (p?: Point) => p ? `${p.longitude},${p.latitude}` : null
    }
  })
  @Field(() => Point)
  pickupLocation: Point;

  @Column()
  @Field()
  dropOffAddress: string;

  @Column("point", {
    transformer: {
      from: (p: Point) => p,
      to: (p?: Point) => p ? `${p.longitude},${p.latitude}` : null
    }
  })
  @Field(() => Point)
  dropOffLocation: Point;

  @ManyToOne(() => User, (user: User) => user.reservations, { lazy: true })
  @Field(() => User)
  user: Lazy<User>;

  @Column("uuid")
  userId: string;

  @ManyToOne(() => Trip, (trip: Trip) => trip.reservations, { lazy: true })
  @Field(() => Trip)
  trip: Lazy<Trip>;

  @Column("uuid")
  tripId: string;

  @Column("enum", { enum: ReservationStatus, default: ReservationStatus.Planned })
  @Field(() => ReservationStatus)
  status: ReservationStatus;
}

