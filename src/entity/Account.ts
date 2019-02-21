import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Point } from "../utils";
import { Photo } from "./Photo";

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;

  @Column({ length: 64 })
  firstName: string;

  @Column({ length: 64 })
  lastName: string;

  @Column({ length: 32 })
  phone: string;

  @Column({ type: "date", nullable: true })
  dateOfBirth?: string;

  @Column({ length: 256, nullable: true })
  homeAddress?: string;

  @Column("point", { nullable: true })
  homeLocation?: Point;

  @OneToOne(() => Photo, (photo: Photo) => photo.owner, { nullable: true })
  @JoinColumn()
  photo?: Photo;
}
