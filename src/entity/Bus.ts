import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Trip } from "./Trip";
import { BusType } from "../utils";

@Entity()
export class Bus extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("smallint")
  capacity: number;

  @Column("smallint")
  numberOfSeats: number;

  @Column("enum", { enum: BusType, nullable: false })
  type: BusType;

  @Column({ nullable: false, unique: true })
  licensePlate: string;

  @Column({ nullable: false })
  make: string;

  @Column({ nullable: false })
  model: string;

  @OneToMany(() => Trip, (trip: Trip) => trip.bus)
  trips: Trip[];
}
