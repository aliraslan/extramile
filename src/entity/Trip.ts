import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Bus } from "./Bus";
import { Driver } from "./Driver";
import { Reservation } from "./Reservation";
import { TripStatus } from "../Enums";
import { Field, ID, ObjectType } from "type-graphql";
import { Lazy } from "../utils";
import { TripStop } from "./TripStop";

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

  @OneToMany(() => TripStop, (stop: TripStop) => stop.trip, { lazy: true })
  @Field(() => [TripStop])
  stops: Lazy<TripStop[]>;

  @ManyToOne(() => Bus, (bus: Bus) => bus.trips, { lazy: true })
  @Field(() => Bus)
  bus: Lazy<Bus>;

  @Column()
  busId: number;

  @OneToMany(() => Reservation, (reservation: Reservation) => reservation.trip, { lazy: true })
  @Field(() => [Reservation])
  reservations: Lazy<Reservation[]>;

  @ManyToOne(() => Driver, (driver: Driver) => driver.trips, { lazy: true })
  @Field(() => Driver)
  driver: Lazy<Driver>;

  @Column()
  driverId: string;
}
