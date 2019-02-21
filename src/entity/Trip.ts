import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Bus } from "./Bus";
import { Driver } from "./Driver";
import { Reservation } from "./Reservation";
import { TripStatus } from "../Enums";

@Entity()
export class Trip extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("timestamp")
  startedAt: string;

  @Column("timestamp", { nullable: true })
  completedAt?: string;

  @Column("enum", {
    default: TripStatus.Planned,
    nullable: false,
    enum: TripStatus
  })
  status: TripStatus;

  @Column("path")
  stops: string;

  @ManyToOne(() => Bus, (bus: Bus) => bus.trips)
  bus: Bus;

  @OneToMany(() => Reservation, (reservation: Reservation) => reservation.trip)
  reservations: Reservation[];

  @ManyToOne(() => Driver, (driver: Driver) => driver.trips)
  driver: Driver;
}
