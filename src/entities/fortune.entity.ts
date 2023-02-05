import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from "typeorm"
import { Users } from "./users.entity";


@Entity('fortunes')
export class Fortunes {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar", { length: 15 })
  fortune!: string;

  @Column("varchar", { length: 110 })
  image_url!: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at!: Date;

  @OneToMany(() => Users, (user) => user.fortune)
  users!: Users[];
}