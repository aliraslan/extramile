import { Account } from "./Account";
import { Entity, OneToMany } from "typeorm";
import { Trip } from "./Trip";
import { Field, ObjectType } from "type-graphql";
import { Lazy } from "../utils";

@Entity()
@ObjectType({ implements: Account })
export class Driver extends Account {
  @OneToMany(() => Trip, (trip: Trip) => trip.driver, { lazy: true })
  @Field(() => [Trip])
  trips: Lazy<Trip[]>;
}
