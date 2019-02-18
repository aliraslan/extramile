import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Trip } from "./Trip";

@Entity()
@ObjectType()
export class Driver extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => Trip, (trip: Trip) => trip.driver)
  @Field(() => [Trip])
  trips: Trip[];
}
