import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Point } from "../utils";
import { Field, ID, InterfaceType } from "type-graphql";
import { JoinColumn } from "typeorm/decorator/relations/JoinColumn";
import { Photo } from "./Photo";

@Entity()
@InterfaceType()
export abstract class Account extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  @Field()
  createdAt: string;

  @Column({ length: 64 })
  @Field()
  firstName: string;

  @Column({ length: 64 })
  @Field()
  lastName: string;

  @Column({ length: 32, unique: true })
  @Field()
  phone: string;

  @Column({ type: "date", nullable: true })
  @Field({ nullable: true })
  dateOfBirth?: string;

  @Column({ length: 256, nullable: true })
  @Field({ nullable: true })
  homeAddress?: string;

  @Column({
    type: "point",
    nullable: true,
    transformer: {
      from: p => p,
      to: p => p ? `${p.x},${p.y}` : null
    }
  })
  @Field(() => Point, { nullable: true })
  homeLocation?: Point;

  @OneToOne(() => Photo, (photo: Photo) => photo.owner, { nullable: true })
  @Field(() => Photo, { nullable: true })
  @JoinColumn()
  photo?: Photo;
}
