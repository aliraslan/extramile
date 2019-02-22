import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Trip } from "./Trip";
import { BusType } from "../Enums";
import { Field, ID, Int, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Bus extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column("smallint")
  @Field(() => Int)
  capacity: number;

  @Column("smallint")
  @Field(() => Int)
  numberOfSeats: number;

  @Column({ type: "enum", enum: BusType, nullable: false })
  @Field(() => BusType)
  type: BusType;

  @Column({ nullable: false, unique: true })
  @Field()
  licensePlate: string;

  @Column({ nullable: false })
  @Field()
  make: string;

  @Column({ nullable: false })
  @Field()
  model: string;

  @OneToMany(() => Trip, (trip: Trip) => trip.bus)
  @Field(() => [Trip])
  trips: Trip[];
}
