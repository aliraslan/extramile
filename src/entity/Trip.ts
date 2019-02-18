import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Bus } from "./Bus";
import { Point, TripStatus } from "../utils";
import { User } from "./User";
import { Driver } from "./Driver";

@Entity()
@ObjectType()
export class Trip extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Bus, (bus: Bus) => bus.trips)
  @Field(() => Bus)
  bus: Bus;

  @ManyToMany(() => User, (user: User) => user.trips)
  @Field(() => [User])
  passengers: User[];

  @ManyToOne(() => Driver, (driver: Driver) => driver.trips)
  @Field(() => Driver)
  driver: Driver;

  @Column("time")
  @Field()
  startedAt: string;


  @Column("time", { nullable: true })
  @Field()
  completedAt?: string;

  // TODO refactor this into a stops model that contains
  //  the list of passengers that are going to be picked up and dropped off.
  //  as well as the address instead of just lat lon.
  @Column("line", { array: true })
  @Field(() => [Point])
  stops: Point[];

  @Column("enum", { default: TripStatus.Planned, nullable: false, enum: TripStatus })
  @Field(() => TripStatus)
  status: TripStatus
}
