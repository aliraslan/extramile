import { Account } from "./Account";
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ID, Int, ObjectType } from "type-graphql";
import { Field } from "type-graphql/decorators/Field";

@Entity()
@ObjectType()
export class Photo extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @OneToOne(() => Account, (owner: Account) => owner.photo)
  @Field(() => Account)
  owner: Account;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  @Field()
  createdAt: string;

  @Column()
  @Field(() => Int)
  height: number;

  @Column()
  @Field(() => Int)
  width: number;

  @Column()
  @Field()
  URI: string;
}
