import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { Trip } from "./Trip";

@Entity()
@ObjectType()
export class Bus extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column("integer")
  @Field(() => Int)
  capacity: number;

  @Column()
  @Field()
  type: string;

  @Column({ nullable: false })
  @Field()
  licensePlate: string;

  @Column()
  @Field()
  make: string;

  @Column()
  @Field()
  model: string;

  @Column()
  @Field()
  chassis: string;

  @OneToMany(() => Trip, (trip: Trip) => trip.bus)
  @Field(() => [Trip])
  trips: Trip[];
}
