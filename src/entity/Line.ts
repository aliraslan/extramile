import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Bus } from "./Bus";
import { TripStop } from "./TripStop";
import { Driver } from "./Driver";
import { Lazy } from "../utils";

@Entity()
@ObjectType()
export class Line extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field()
  name: string;

  @OneToMany(() => TripStop, (stop: TripStop) => stop.line, { lazy: true })
  @Field(() => [TripStop])
  stops: Lazy<TripStop[]>;

  @ManyToOne(() => Bus, (bus: Bus) => bus.trips, { lazy: true })
  @Field(() => Bus)
  bus: Lazy<Bus>;

  @Column()
  busId: number;

  @ManyToOne(() => Driver, (driver: Driver) => driver.trips, { lazy: true })
  @Field(() => Driver)
  driver: Lazy<Driver>;

  @Column()
  driverId: string;
}
