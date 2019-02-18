import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { IsEmail } from "class-validator";

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

  @Column({ unique: true })
  @Field()
  @IsEmail()
  email: string;

  @Column()
  password: string;
}
