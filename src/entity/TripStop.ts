import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Lazy, Point } from "../utils";
import { Trip } from "./Trip";
import { Line } from "./Line";

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
    type: "point",
    transformer: {
      from: p => p,
      to: p => `${p.x},${p.y}`
    }
  })
  @Field(() => Point)
  location: Point;

  @ManyToOne(() => Trip, (trip: Trip) => trip.stops, {
    lazy: true,
    nullable: true
  })
  @Field(() => Trip, { nullable: true })
  trip: Lazy<Trip>;

  @Column({ nullable: true })
  @Field({ nullable: true })
  tripId?: string;

  @ManyToOne(() => Line, (line: Line) => line.stops, {
    lazy: true,
    nullable: true
  })
  @Field(() => Line, { nullable: true })
  line: Lazy<Line>;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lineId?: string;
}
