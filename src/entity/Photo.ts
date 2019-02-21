import { Account } from "./Account";
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Photo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Account, (owner: Account) => owner.photo)
  owner: Account;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;

  @Column()
  height: number;

  @Column()
  width: number;

  @Column()
  URI: string;
}
