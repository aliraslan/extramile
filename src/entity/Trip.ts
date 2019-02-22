import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Bus } from "./Bus";
import { Driver } from "./Driver";
import { Reservation } from "./Reservation";
import { TripStatus } from "../Enums";
import { Field, ID, ObjectType } from "type-graphql";
import { Lazy } from "../utils";

@Entity()
@ObjectType()
export class Trip extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column("timestamp")
  @Field()
  startedAt: string;

  @Column("timestamp", { nullable: true })
  @Field({ nullable: true })
  completedAt?: string;

  @Column("enum", {
    default: TripStatus.Planned,
    nullable: false,
    enum: TripStatus
  })
  @Field(() => TripStatus)
  status: TripStatus;

  @Column("path")
  @Field()
  stops: string;

  @ManyToOne(() => Bus, (bus: Bus) => bus.trips, { lazy: true })
  @Field(() => Bus)
  bus: Lazy<Bus>;

  @OneToMany(() => Reservation, (reservation: Reservation) => reservation.trip, { lazy: true })
  @Field(() => [Reservation])
  reservations: Lazy<Reservation[]>;

  @ManyToOne(() => Driver, (driver: Driver) => driver.trips, { lazy: true })
  @Field(() => Driver)
  driver: Lazy<Driver>;
}
