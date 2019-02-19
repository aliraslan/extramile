import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Bus } from "./Bus";
import { TripStatus } from "../utils";
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

  @ManyToMany(() => User)
  @Field(() => [User])
  @JoinTable()
  passengers: User[];

  @ManyToOne(() => Driver, (driver: Driver) => driver.trips)
  @Field(() => Driver)
  driver: Driver;

  @Column("timestamp")
  @Field()
  startedAt: string;

  @Column("timestamp", { nullable: true })
  @Field()
  completedAt?: string;

  // TODO refactor this into a stops model that contains
  //  the list of passengers that are going to be picked up and dropped off.
  //  as well as the address instead of just lat lon.
  @Column("path")
  @Field()
  stops: string;

  @Column("enum", {
    default: TripStatus.Planned,
    nullable: false,
    enum: TripStatus
  })
  @Field(() => TripStatus)
  status: TripStatus;
}
