import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  OneToMany
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { IsEmail } from "class-validator";
import { Trip } from "./Trip";
import { Point } from "../utils";
import { Feedback } from "./Feedback";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  firstName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lastName?: string;

  @Column({ type: "date", nullable: true })
  @Field({ nullable: true })
  dateOfBirth?: string;

  @Column({ length: 45, nullable: true })
  @Field({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  workAddress?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  homeAddress?: string;

  @Column("point", { nullable: true })
  @Field({ nullable: true })
  workLocation?: Point;

  @Column("point", { nullable: true })
  @Field({ nullable: true })
  homeLocation?: Point;

  @Column({ unique: true })
  @Field()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Trip, (trip: Trip) => trip.passengers)
  @Field(() => [Trip])
  trips: Trip[];

  @OneToMany(() => Feedback, (ticket: Feedback) => ticket.user)
  @Field(() => [Feedback])
  tickets: Feedback[];
}
