import { Account } from "./Account";
import { Entity, OneToMany } from "typeorm";
import { Trip } from "./Trip";

@Entity()
export class Driver extends Account {
  @OneToMany(() => Trip, (trip: Trip) => trip.driver)
  trips: Trip[];
}
