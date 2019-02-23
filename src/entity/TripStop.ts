import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Lazy, Point } from "../utils";
import { Trip } from "./Trip";

@Entity()
@ObjectType()
export class TripStop extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  address: string;

  @Column({
    type: "point", transformer: {
      from: p => p,
      to: p => `${p.x},${p.y}`
    }
  })
  @Field(() => Point)
  location: Point;

  @ManyToOne(() => Trip, (trip: Trip) => trip.stops, { lazy: true, nullable: true })
  @Field(() => Trip, { nullable: true })
  trip: Lazy<Trip>;

  @Column({ nullable: true })
  tripId?: string;
}