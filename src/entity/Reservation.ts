import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Trip } from "./Trip";
import { ReservationStatus } from "../Enums";
import { Point } from "../utils";

// Sorry Beshoi.
@Entity()
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  pickupTime: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: true })
  dropOffTime: string;

  @Column()
  pickupAddress: string;

  @Column("point")
  pickupLocation: Point;

  @Column()
  dropOffAddress: string;

  @Column("point")
  dropOffLocation: Point;

  @ManyToOne(() => User, (user: User) => user.reservations)
  user: User;

  @ManyToOne(() => Trip, (trip: Trip) => trip.reservations)
  trip: Trip;

  @Column("enum", { enum: ReservationStatus, default: ReservationStatus.Planned })
  status: ReservationStatus;
}

