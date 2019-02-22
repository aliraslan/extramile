import { Account } from "./Account";
import { Entity, OneToMany } from "typeorm";
import { Trip } from "./Trip";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType({ implements: Account })
export class Driver extends Account {
  @OneToMany(() => Trip, (trip: Trip) => trip.driver)
  @Field(() => [Trip])
  trips: Trip[];
}
