import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, Int, ObjectType } from "type-graphql";

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
}
